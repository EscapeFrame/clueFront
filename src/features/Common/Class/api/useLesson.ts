import Customapi from '@/shared/config/api';
import { Assignment } from '@/shared/types/Class/Assignment/assignmentAttachment'
import { Exam } from '@/shared/types/Class/Exam';
import { NewsItem, QuestionItem } from '@/shared/types/Class/Lesson';

// API 응답 타입 정의
interface DirectoryApiResponse {
  directoryList: Array<{
    directoryId: number;
    directoryName: string;
  }>;
}

// 과제 목록 조회
export const AssignmentsApi = async (classId: string): Promise<Assignment[]> => {
  const res = await Customapi.get(`/api/assignments/${classId}/all`);

  if (res.status < 200 || res.status >= 300) {
    throw new Error(`서버 에러: ${res.status}`);
  }

  return res.data;
};

// 시험 목록 가져오기
export const ExamApi = async (examNumber: string): Promise<Exam[]> => {
  const res = await Customapi.get(`/api/exam/${examNumber}`); // API 경로는 필요시 수정

  if (res.status < 200 || res.status >= 300) {
    throw new Error(`서버 에러: ${res.status}`);
  }

  return res.data;
};

// 수업 디렉토리 조회(없음)
export const getLessonDirectories = async (classRoomId: string): Promise<DirectoryApiResponse> => {
  try {
    const res = await Customapi.get<DirectoryApiResponse>(`/api/class/${classRoomId}/all`);
    if (res.status < 200 || res.status >= 300) {
      console.error(`수업 디렉토리 조회 실패: ${res.status}`);
      return { directoryList: [] };
    }
    return res.data ?? { directoryList: [] };
  } catch (e) {
    console.error('수업 디렉토리 조회 실패:', e);
    return { directoryList: [] };
  }
};

// 새소식 조회(없음)
export const getLessonNews = async (classRoomId: string): Promise<NewsItem[]> => {
  const res = await Customapi.get(`/api/lessons/${classRoomId}/news`);
  if (res.status < 200 || res.status >= 300) {
    console.error(`새소식 조회 실패: ${res.status}`);
    return [];
  }
  return res.data;
};

// 질문 조회(없음)
export const getLessonQuestions = async (classRoomId: string): Promise<QuestionItem[]> => {
  const res = await Customapi.get(`/api/lessons/${classRoomId}/questions`);
  if (res.status < 200 || res.status >= 300) {
    console.error(`질문 조회 실패: ${res.status}`);
    return [];
  }
  return res.data;
};