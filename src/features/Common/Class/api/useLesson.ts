import Customapi from '@/shared/config/api';
import { NewsItem, QuestionItem, Directory } from '@/shared/types/Class/Lesson';

// 수업 디렉토리 조회(없음)
export const getLessonDirectories = async (classRoomId: string): Promise<Directory[]> => {
  const res = await Customapi.get(`/api/class/${classRoomId}/all`);
  if (res.status !== 200) {
    console.error(`수업 디렉토리 조회 실패: ${res.status}`);
    return [];
  }
  console.log(res.data);
  return res.data;
};

// 새소식 조회(없음)
export const getLessonNews = async (classRoomId: string): Promise<NewsItem[]> => {
  const res = await Customapi.get(`/api/lessons/${classRoomId}/news`);
  if (res.status !== 200) {
    console.error(`새소식 조회 실패: ${res.status}`);
    return [];
  }
  return res.data;
};

// 질문 조회(없음)
export const getLessonQuestions = async (classRoomId: string): Promise<QuestionItem[]> => {
  const res = await Customapi.get(`/api/lessons/${classRoomId}/questions`);
  if (res.status !== 200) {
    console.error(`질문 조회 실패: ${res.status}`);
    return [];
  }
  return res.data;
};