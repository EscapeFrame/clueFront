import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type {
  RoomData,
  AnswerSubmission,
  QuizBattleCallbacks,
  WebSocketResponse,
  QuestionData,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

class QuizBattleService {
  private client: Client | null = null;
  private connected: boolean = false;
  private subscriptions: Record<string, StompSubscription> = {};
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  // WebSocket 연결
  connect(token?: string, onConnect?: () => void, onError?: (error: any) => void): void {
    // 토큰 가져오기 (파라미터 또는 localStorage)
    const accessToken = token || localStorage.getItem('accessToken') || '';

    if (!accessToken) {
      console.error('[QuizBattle] Access token is missing');
      if (onError) onError(new Error('Access token is required'));
      return;
    }

    // SockJS를 사용한 WebSocket 연결
    const socket = new SockJS(`${API_BASE_URL}/ws-quiz`);

    this.client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`, // JWT 토큰 전달
      },
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      reconnectDelay: 5000,
      beforeConnect: () => {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          console.error('[QuizBattle] Max reconnection attempts reached');
          return Promise.reject(new Error('Max reconnection attempts'));
        }
        this.reconnectAttempts++;
        console.log(
          `[QuizBattle] Connection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
        );
        return Promise.resolve();
      },
      debug: (str: string) => {
        // 중요한 프레임만 로깅
        if (
          str.includes('ERROR') ||
          str.includes('MESSAGE') ||
          str.includes('CONNECTED') ||
          str.includes('SUBSCRIBE') ||
          str.includes('DISCONNECT')
        ) {
          console.log('[QuizBattle STOMP]', str);
        }
      },
      onConnect: (frame) => {
        this.connected = true;
        this.reconnectAttempts = 0; // 연결 성공 시 카운터 리셋
        console.log('[QuizBattle] ✅ Connected to WebSocket successfully');
        console.log('[QuizBattle] Session:', frame.headers?.['session']);
        if (onConnect) onConnect();
      },
      onStompError: (frame: any) => {
        console.error('[QuizBattle] STOMP error:', frame);
        console.error('[QuizBattle] Error details:', {
          command: frame.command,
          headers: frame.headers,
          body: frame.body,
        });

        // 인증 에러 처리
        if (
          frame.headers?.message?.includes('Unauthorized') ||
          frame.headers?.message?.includes('Invalid token') ||
          frame.body?.includes('Unauthorized')
        ) {
          console.error('[QuizBattle] Authentication failed - Invalid token');
          alert('인증에 실패했습니다. 다시 로그인해주세요.');
        }

        if (onError) onError(frame);
      },
      onWebSocketError: (error: any) => {
        console.error('[QuizBattle] WebSocket error:', error);
        if (onError) onError(error);
      },
      onDisconnect: () => {
        console.warn('[QuizBattle] Disconnected from server');
        this.connected = false;
      },
      onWebSocketClose: (event) => {
        console.warn('[QuizBattle] WebSocket closed', {
          code: event?.code,
          reason: event?.reason || 'No reason provided',
          wasClean: event?.wasClean,
        });
        this.connected = false;
      },
    });

    this.client.activate();
  }

  // 연결 해제
  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.connected = false;
      this.subscriptions = {};
    }
  }

  // 연결 상태 확인
  isConnected(): boolean {
    return this.connected;
  }

  // 방 생성
  createRoom(roomData: RoomData, onRoomCreated?: (response: WebSocketResponse) => void): void {
    if (!this.connected || !this.client) {
      console.error('Not connected to WebSocket');
      return;
    }

    // 방 생성 알림 구독
    this.subscriptions['rooms'] = this.client.subscribe(
      '/topic/quiz/rooms',
      (message: IMessage) => {
        const response: WebSocketResponse = JSON.parse(message.body);
        // 새 명세서 기준: type: 'ROOM_CREATED' 확인
        if (response.type === 'ROOM_CREATED' || response.status === 'success') {
          if (onRoomCreated) onRoomCreated(response);
        }
      }
    );

    // 방 생성 요청
    this.client.publish({
      destination: '/app/quiz/create',
      body: JSON.stringify({
        maxParticipants: roomData.maxParticipants,
        questionCount: roomData.questionCount,
        timePerQuestion: roomData.timePerQuestion,
        classRoomId: roomData.classRoomId,
        documentId: roomData.documentId,
      }),
    });
  }

  // 방 참가
  joinRoom(roomCode: string, callbacks: QuizBattleCallbacks): void {
    if (!this.connected || !this.client) {
      console.error('Not connected to WebSocket');
      return;
    }

    // 참가자 업데이트 구독
    this.subscriptions[`participants-${roomCode}`] = this.client.subscribe(
      `/topic/quiz/${roomCode}/participants`,
      (message: IMessage) => {
        const response: WebSocketResponse = JSON.parse(message.body);
        // 새 명세서: type: 'PARTICIPANT_JOINED', participants 필드 사용
        // 하위 호환성: allParticipants도 지원
        if (callbacks.onParticipantUpdate) {
          // participants를 allParticipants로 매핑 (하위 호환성)
          if (response.participants && !response.allParticipants) {
            response.allParticipants = response.participants;
          }
          callbacks.onParticipantUpdate(response);
        }
      }
    );

    // 게임 이벤트 구독
    this.subscriptions[`game-${roomCode}`] = this.client.subscribe(
      `/topic/quiz/${roomCode}/game`,
      (message: IMessage) => {
        const response: WebSocketResponse<QuestionData> = JSON.parse(message.body);

        // 새 명세서: type 필드로 메시지 구분
        switch (response.type) {
          case 'QUIZ_STARTED':
          case 'NEXT_QUESTION':
            // 문제 메시지 - QuestionData 형식으로 변환
            if (callbacks.onQuestion) {
              const questionData: QuestionData = {
                questionNumber: (response as any).questionNumber,
                questionText: (response as any).questionText,
                options: (response as any).options || [],
                timeLimit: (response as any).timeLimit,
                totalQuestions: (response as any).totalQuestions,
                correctAnswer: (response as any).correctAnswer,
                explanation: (response as any).explanation,
                difficulty: (response as any).difficulty,
              };
              callbacks.onQuestion(questionData);
            }
            break;

          case 'ANSWER_REVEAL':
            // 정답 공개 메시지 (시간 종료 시)
            if (callbacks.onAnswerReveal) {
              callbacks.onAnswerReveal(response as any);
            }
            break;

          case 'QUIZ_FINISHED':
            // 퀴즈 종료 메시지
            if (callbacks.onQuizFinished) {
              // rankings를 finalRankings로 매핑 (하위 호환성)
              if (response.rankings && !response.finalRankings) {
                response.finalRankings = response.rankings;
              }
              callbacks.onQuizFinished(response);
            }
            break;

          case 'ROOM_CANCELLED':
            // 방 취소 메시지
            if (callbacks.onRoomCancelled) callbacks.onRoomCancelled(response);
            break;

          case 'ERROR':
            // 에러 메시지
            if (callbacks.onError) callbacks.onError(response);
            break;

          default:
            // 하위 호환성: 기존 status 기반 처리
            if (response.status === 'success' && (response as any).correctAnswer !== undefined) {
              // 정답 공개 메시지 (status 기반)
              if (callbacks.onAnswerReveal) callbacks.onAnswerReveal(response as any);
            } else if (response.data && 'questionNumber' in response.data) {
              // 문제 메시지
              if (callbacks.onQuestion) callbacks.onQuestion(response.data);
            } else if (response.status === 'finished') {
              // 퀴즈 종료 메시지
              if (callbacks.onQuizFinished) callbacks.onQuizFinished(response);
            } else if (response.status === 'cancelled') {
              // 방 취소 메시지
              if (callbacks.onRoomCancelled) callbacks.onRoomCancelled(response);
            } else if (response.status === 'error') {
              // 에러 메시지
              if (callbacks.onError) callbacks.onError(response);
            }
            break;
        }
      }
    );

    // 개인 결과 구독 (답변 결과)
    this.subscriptions[`result-${roomCode}`] = this.client.subscribe(
      '/user/queue/quiz/result',
      (message: IMessage) => {
        const response = JSON.parse(message.body);
        if (callbacks.onAnswerResult) callbacks.onAnswerResult(response);
      }
    );

    // 에러 구독
    this.subscriptions[`errors-${roomCode}`] = this.client.subscribe(
      '/user/queue/errors',
      (message: IMessage) => {
        const response = JSON.parse(message.body);
        if (callbacks.onError) callbacks.onError(response);
      }
    );

    // 방 참가 요청
    this.client.publish({
      destination: `/app/quiz/join/${roomCode}`,
      body: JSON.stringify({}),
    });
  }

  // 퀴즈 시작 (호스트만 가능)
  startQuiz(roomCode: string): void {
    if (!this.connected || !this.client) {
      console.error('Not connected to WebSocket');
      return;
    }

    this.client.publish({
      destination: `/app/quiz/start/${roomCode}`,
      body: JSON.stringify({}),
    });
  }

  // 답변 제출
  submitAnswer(roomCode: string, answerData: AnswerSubmission): void {
    if (!this.connected || !this.client) {
      console.error('Not connected to WebSocket');
      return;
    }

    this.client.publish({
      destination: `/app/quiz/answer/${roomCode}`,
      body: JSON.stringify({
        questionNumber: answerData.questionNumber,
        answerIndex: answerData.answerIndex,
        submittedAt: answerData.submittedAt || Date.now(), // epoch ms
        timeSpent: answerData.timeSpent, // 밀리초 (ms) 단위
      }),
    });
  }

  // 다음 문제로 이동 (호스트만 가능)
  nextQuestion(roomCode: string): void {
    if (!this.connected || !this.client) {
      console.error('Not connected to WebSocket');
      return;
    }

    this.client.publish({
      destination: `/app/quiz/next/${roomCode}`,
      body: JSON.stringify({}),
    });
  }

  // 랭킹 조회
  getRankings(roomCode: string, onRankings?: (response: WebSocketResponse) => void): void {
    if (!this.connected || !this.client) {
      console.error('Not connected to WebSocket');
      return;
    }

    // 랭킹 구독
    if (!this.subscriptions[`rankings-${roomCode}`]) {
      this.subscriptions[`rankings-${roomCode}`] = this.client.subscribe(
        `/topic/quiz/${roomCode}/rankings`,
        (message: IMessage) => {
          const response: WebSocketResponse = JSON.parse(message.body);
          if (onRankings) onRankings(response);
        }
      );
    }

    // 랭킹 요청
    this.client.publish({
      destination: `/app/quiz/rankings/${roomCode}`,
      body: JSON.stringify({}),
    });
  }

  // 방 나가기
  leaveRoom(roomCode: string): void {
    if (!this.connected || !this.client) {
      console.error('Not connected to WebSocket');
      return;
    }

    this.client.publish({
      destination: `/app/quiz/leave/${roomCode}`,
      body: JSON.stringify({}),
    });

    // 구독 해제
    this.unsubscribeRoom(roomCode);
  }

  // 방 취소 (호스트만 가능)
  cancelRoom(roomCode: string): void {
    if (!this.connected || !this.client) {
      console.error('Not connected to WebSocket');
      return;
    }

    this.client.publish({
      destination: `/app/quiz/cancel/${roomCode}`,
      body: JSON.stringify({}),
    });
  }

  // 특정 방 관련 구독 해제
  unsubscribeRoom(roomCode: string): void {
    const keys = Object.keys(this.subscriptions);
    keys.forEach((key) => {
      if (key.includes(roomCode)) {
        this.subscriptions[key].unsubscribe();
        delete this.subscriptions[key];
      }
    });
  }

  // 모든 구독 해제
  unsubscribeAll(): void {
    Object.values(this.subscriptions).forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = {};
  }
}

export default new QuizBattleService();
