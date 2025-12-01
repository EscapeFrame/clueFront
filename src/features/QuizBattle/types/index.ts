// 메시지 타입 정의 (백엔드 명세서 기준)
export type MessageType =
  | 'ROOM_CREATED'
  | 'PARTICIPANT_JOINED'
  | 'QUIZ_STARTED'
  | 'ANSWER_RESULT'
  | 'ANSWER_REVEAL'
  | 'NEXT_QUESTION'
  | 'QUIZ_FINISHED'
  | 'RANKINGS_UPDATED'
  | 'ROOM_CANCELLED'
  | 'ERROR';

export interface ParticipantInfo {
  username: string;
  userId: string;
  isHost?: boolean;
  score: number;
  correctAnswers: number;
  isReady?: boolean;
  joinedAt?: number; // epoch ms
}

export interface QuestionData {
  questionNumber: number;
  questionText: string;
  options: string[];
  timeLimit: number;
  totalQuestions: number;
  correctAnswer?: number; // 0-based index (답안 제출 후 받을 수 있음)
  explanation?: string; // 해설
  difficulty?: string; // Easy, Medium, Hard
}

export interface AnswerSubmission {
  questionNumber: number;
  answerIndex: number;
  submittedAt: number; // epoch ms로 변경
  timeSpent: number; // 밀리초 (ms) 단위
}

export interface AnswerResult {
  type: 'ANSWER_RESULT';
  questionNumber: number;
  isCorrect: boolean;
  points: number;
  correctAnswer: number; // 정답 인덱스
  explanation?: string; // 해설
}

// 정답 공개 메시지 (시간 종료 시)
export interface AnswerRevealMessage {
  type?: 'ANSWER_REVEAL';
  status?: string;
  questionNumber: number;
  correctAnswer: number; // 정답 인덱스
  explanation?: string; // 해설
  statistics?: Map<number, number>; // 각 선택지별 응답 수
  totalAnswers?: number; // 전체 응답 수
  message?: string;
}

export interface RankingData {
  rank?: number;
  username: string;
  userId: string;
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy?: number; // 정답률 (%)
  averageResponseTime?: number; // 평균 응답 시간 (ms)
}

export interface RoomData {
  maxParticipants: number;
  questionCount: number;
  timePerQuestion: number;
  classRoomId?: string | null;
  documentId?: string | null;
}

export interface RoomInfo extends RoomData {
  roomCode: string;
  hostUserId: string;
  hostUsername: string;
  currentParticipants: number;
  status: 'waiting' | 'playing' | 'finished';
  createdAt: string;
}

// 방 생성 응답
export interface RoomCreatedMessage {
  type: 'ROOM_CREATED';
  roomCode: string;
  hostName: string;
  maxParticipants: number;
  questionCount: number;
  timePerQuestion: number;
  createdAt: string;
}

// 참가자 입장/퇴장 메시지
export interface ParticipantUpdateMessage {
  type: 'PARTICIPANT_JOINED';
  roomCode: string;
  participants: ParticipantInfo[];
  currentParticipantCount: number;
}

// 퀴즈 시작 메시지
export interface QuizStartedMessage {
  type: 'QUIZ_STARTED';
  questionNumber: number;
  questionText: string;
  options: string[];
  timeLimit: number;
  totalQuestions: number;
}

// 다음 문제 메시지
export interface NextQuestionMessage {
  type: 'NEXT_QUESTION';
  questionNumber: number;
  questionText: string;
  options: string[];
  timeLimit: number;
  totalQuestions: number;
}

// 퀴즈 종료 메시지
export interface QuizFinishedMessage {
  type: 'QUIZ_FINISHED';
  message: string;
  rankings: RankingData[];
}

// 순위 업데이트 메시지
export interface RankingsUpdatedMessage {
  type: 'RANKINGS_UPDATED';
  rankings: RankingData[];
  updatedAt: number;
}

// 방 취소 메시지
export interface RoomCancelledMessage {
  type: 'ROOM_CANCELLED';
  message: string;
  reason: string;
}

// 에러 메시지
export interface ErrorMessage {
  type: 'ERROR';
  message: string;
  code?: string;
}

// 통합 WebSocket 메시지 타입
export type WebSocketMessage =
  | RoomCreatedMessage
  | ParticipantUpdateMessage
  | QuizStartedMessage
  | NextQuestionMessage
  | QuizFinishedMessage
  | RankingsUpdatedMessage
  | RoomCancelledMessage
  | AnswerResult
  | AnswerRevealMessage
  | ErrorMessage;

// 하위 호환성을 위한 기존 인터페이스 (deprecated)
export interface WebSocketResponse<T = any> {
  status?: 'success' | 'error' | 'playing' | 'finished' | 'cancelled';
  type?: MessageType;
  message?: string;
  roomCode?: string;
  data?: T;
  allParticipants?: ParticipantInfo[];
  participants?: ParticipantInfo[];
  finalRankings?: RankingData[];
  rankings?: RankingData[];
  currentParticipantCount?: number;
}

export interface QuizBattleCallbacks {
  onParticipantUpdate?: (response: ParticipantUpdateMessage | WebSocketResponse) => void;
  onQuestion?: (question: QuestionData) => void;
  onAnswerResult?: (result: AnswerResult) => void;
  onAnswerReveal?: (reveal: AnswerRevealMessage) => void;
  onQuizFinished?: (response: QuizFinishedMessage | WebSocketResponse) => void;
  onRoomCancelled?: (response: RoomCancelledMessage | WebSocketResponse) => void;
  onError?: (error: ErrorMessage | any) => void;
}

export type GameStatus = 'waiting' | 'playing' | 'finished';
