import Customapi from '@/shared/config/api';

// ================= Types =================

export interface Participant {
  userId: string;
  username: string;
  sessionId: string;
  score: number;
  correctAnswers: number;
  isReady: boolean;
  joinedAt: number;
}

export interface QuizRoom {
  roomCode: string;
  hostId: string;
  hostName: string;
  status: string;
  maxParticipants: number;
  currentParticipants: number;
  questionCount: number;
  timePerQuestion: number;
  participants: Participant[];
  createdAt: string;
  startedAt: string;
  finishedAt: string;
}

export interface QuizRoomSummary {
  roomCode: string;
  hostName: string;
  status: string;
  maxParticipants: number;
  currentParticipants: number;
  questionCount: number;
  timePerQuestion: number;
  createdAt: string;
}

export interface JoinableResponse {
  joinable: boolean;
  message?: string;
}

// ================= GET /api/quiz/rooms/{roomCode} =================
// 특정 퀴즈 방의 상세 정보 조회
export const getQuizRoom = async (roomCode: string): Promise<QuizRoom> => {
  const response = await Customapi.get<QuizRoom>(`/api/quiz/rooms/${roomCode}`);
  return response.data;
};

// ================= GET /api/quiz/rooms/{roomCode}/joinable =================
// 퀴즈 방 참여 가능 여부 확인
export const checkRoomJoinable = async (roomCode: string): Promise<JoinableResponse> => {
  const response = await Customapi.get<JoinableResponse>(`/api/quiz/rooms/${roomCode}/joinable`);
  return response.data;
};

// ================= GET /api/quiz/rooms/host/{hostId} =================
// 특정 호스트가 만든 퀴즈 방 목록 조회
export const getQuizRoomsByHost = async (hostId: string): Promise<QuizRoomSummary[]> => {
  const response = await Customapi.get<QuizRoomSummary[]>(`/api/quiz/rooms/host/${hostId}`);
  return response.data;
};

// ================= GET /api/quiz/rooms/classroom/{classRoomId} =================
// 특정 클래스룸의 퀴즈 방 목록 조회
export const getQuizRoomsByClassroom = async (classRoomId: string): Promise<QuizRoomSummary[]> => {
  const response = await Customapi.get<QuizRoomSummary[]>(`/api/quiz/rooms/classroom/${classRoomId}`);
  return response.data;
};

// ================= GET /api/quiz/rooms/active =================
// 활성화된 퀴즈 방 목록 조회
export const getActiveQuizRooms = async (): Promise<QuizRoomSummary[]> => {
  const response = await Customapi.get<QuizRoomSummary[]>('/api/quiz/rooms/active');
  return response.data;
};
