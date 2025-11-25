export interface ParticipantInfo {
  username: string;
  userId: string;
  isHost: boolean;
  score: number;
  isReady?: boolean;
}

export interface QuestionData {
  questionNumber: number;
  questionText: string;
  options: string[];
  timeLimit: number;
  totalQuestions: number;
}

export interface AnswerSubmission {
  questionNumber: number;
  answerIndex: number;
  submittedAt: string;
  timeSpent: number;
}

export interface AnswerResult {
  isCorrect: boolean;
  points: number;
  answerIndex: number;
  correctAnswerIndex?: number;
  message?: string;
}

export interface RankingData {
  username: string;
  userId: string;
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  rank?: number;
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

export interface WebSocketResponse<T = any> {
  status: 'success' | 'error' | 'playing' | 'finished' | 'cancelled';
  message?: string;
  roomCode?: string;
  data?: T;
  allParticipants?: ParticipantInfo[];
  finalRankings?: RankingData[];
  rankings?: RankingData[];
}

export interface QuizBattleCallbacks {
  onParticipantUpdate?: (response: WebSocketResponse) => void;
  onQuestion?: (question: QuestionData) => void;
  onAnswerResult?: (result: AnswerResult) => void;
  onQuizFinished?: (response: WebSocketResponse) => void;
  onRoomCancelled?: (response: WebSocketResponse) => void;
  onError?: (error: any) => void;
}

export type GameStatus = 'waiting' | 'playing' | 'finished';
