import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getQuizRoom,
  checkRoomJoinable,
  getQuizRoomsByHost,
  getQuizRoomsByClassroom,
  getActiveQuizRooms,
  QuizRoom,
  QuizRoomSummary,
  JoinableResponse,
} from '../api/quiz.api';

// ================= Query Keys =================
export const quizRoomKeys = {
  all: ['quizRooms'] as const,
  detail: (roomCode: string) => [...quizRoomKeys.all, 'detail', roomCode] as const,
  joinable: (roomCode: string) => [...quizRoomKeys.all, 'joinable', roomCode] as const,
  byHost: (hostId: string) => [...quizRoomKeys.all, 'byHost', hostId] as const,
  byClassroom: (classRoomId: string) => [...quizRoomKeys.all, 'byClassroom', classRoomId] as const,
  active: () => [...quizRoomKeys.all, 'active'] as const,
};

// ================= GET /api/quiz/rooms/{roomCode} =================
export const useQuizRoom = (
  roomCode: string,
  options?: Omit<UseQueryOptions<QuizRoom, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<QuizRoom, Error>({
    queryKey: quizRoomKeys.detail(roomCode),
    queryFn: () => getQuizRoom(roomCode),
    enabled: !!roomCode,
    ...options,
  });
};

// ================= GET /api/quiz/rooms/{roomCode}/joinable =================
export const useCheckRoomJoinable = (
  roomCode: string,
  options?: Omit<UseQueryOptions<JoinableResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<JoinableResponse, Error>({
    queryKey: quizRoomKeys.joinable(roomCode),
    queryFn: () => checkRoomJoinable(roomCode),
    enabled: !!roomCode,
    ...options,
  });
};

// ================= GET /api/quiz/rooms/host/{hostId} =================
export const useQuizRoomsByHost = (
  hostId: string,
  options?: Omit<UseQueryOptions<QuizRoomSummary[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<QuizRoomSummary[], Error>({
    queryKey: quizRoomKeys.byHost(hostId),
    queryFn: () => getQuizRoomsByHost(hostId),
    enabled: !!hostId,
    ...options,
  });
};

// ================= GET /api/quiz/rooms/classroom/{classRoomId} =================
export const useQuizRoomsByClassroom = (
  classRoomId: string,
  options?: Omit<UseQueryOptions<QuizRoomSummary[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<QuizRoomSummary[], Error>({
    queryKey: quizRoomKeys.byClassroom(classRoomId),
    queryFn: () => getQuizRoomsByClassroom(classRoomId),
    enabled: !!classRoomId,
    ...options,
  });
};

// ================= GET /api/quiz/rooms/active =================
export const useActiveQuizRooms = (
  options?: Omit<UseQueryOptions<QuizRoomSummary[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<QuizRoomSummary[], Error>({
    queryKey: quizRoomKeys.active(),
    queryFn: () => getActiveQuizRooms(),
    ...options,
  });
};
