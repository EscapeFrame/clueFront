import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type {
  RoomData,
  AnswerSubmission,
  QuizBattleCallbacks,
  WebSocketResponse,
  QuestionData,
} from '../types';

class QuizBattleService {
  private client: Client | null = null;
  private connected: boolean = false;
  private subscriptions: Record<string, StompSubscription> = {};

  // WebSocket 연결
  connect(token: string, onConnect?: () => void, onError?: (error: any) => void): void {
    // SockJS를 사용한 WebSocket 연결
    const socket = new SockJS('http://localhost:8080/ws-quiz');

    this.client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`, // JWT 토큰 전달
      },
      debug: (str: string) => {
        console.log('STOMP Debug:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        this.connected = true;
        console.log('Connected to WebSocket');
        if (onConnect) onConnect();
      },
      onStompError: (frame: any) => {
        console.error('STOMP error:', frame);
        if (onError) onError(frame);
      },
      onWebSocketError: (error: any) => {
        console.error('WebSocket error:', error);
        if (onError) onError(error);
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
        if (onRoomCreated) onRoomCreated(response);
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
        if (callbacks.onParticipantUpdate) callbacks.onParticipantUpdate(response);
      }
    );

    // 게임 이벤트 구독
    this.subscriptions[`game-${roomCode}`] = this.client.subscribe(
      `/topic/quiz/${roomCode}/game`,
      (message: IMessage) => {
        const response: WebSocketResponse<QuestionData> = JSON.parse(message.body);

        // 메시지 타입에 따라 콜백 실행
        if (response.data && 'questionNumber' in response.data) {
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
        submittedAt: answerData.submittedAt || new Date().toISOString(),
        timeSpent: answerData.timeSpent,
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
