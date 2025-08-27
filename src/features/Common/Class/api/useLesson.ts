import Customapi from '@/shared/config/api';
import { Directory, DirectoryCreateRequest, 
        DirectoryUpdateRequest, NewsItem, QuestionItem } from '@/shared/types/class/lesson';

// 디렉토리 전체 조회
export const fetchDirectories = async (classRoomId: string): Promise<Directory[]> => {
  const res = await Customapi.get(`/api/class/${classRoomId}/directories`);
  if (res.status !== 200) throw new Error('디렉토리 조회 실패');
  return res.data;
};

// 디렉토리 생성
export const createDirectory = async (payload: DirectoryCreateRequest): Promise<Directory> => {
  const res = await Customapi.post(`/api/directory`, payload);
  if (res.status !== 200) throw new Error('디렉토리 생성 실패');
  return res.data;
};

// 디렉토리 수정
export const updateDirectory = async (directoryId: number, payload: DirectoryUpdateRequest): Promise<Directory> => {
  const res = await Customapi.patch(`/api/directory/${directoryId}`, payload);
  if (res.status !== 200) throw new Error('디렉토리 수정 실패');
  return res.data;
};

// 새소식 조회
export const fetchNews = async (): Promise<NewsItem[]> => {
  const res = await Customapi.get('/api/news');
  if (res.status !== 200) throw new Error('소식 조회 실패');
  return res.data;
};

// 질문 조회
export const fetchQuestions = async (): Promise<QuestionItem[]> => {
  const res = await Customapi.get('/api/questions');
  if (res.status !== 200) throw new Error('질문 조회 실패');
  return res.data;
};