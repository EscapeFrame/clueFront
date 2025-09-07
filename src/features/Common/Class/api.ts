import Customapi from '@/shared/config/api';
import { Assignment } from '@/shared/types/Class/Assignment/Attachment';
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
  const response = await Customapi.get(`/api/assignments/${classId}/all`);
  
  if (response.status !== 200) {
    throw new Error(`서버 에러: ${response.status}`);
  }

  return response.data;
};

// 시험 목록 가져오기
export const ExamApi = async (examNumber: string): Promise<Exam[]> => {
  const res = await Customapi.get(`/api/exam/${examNumber}`); // API 경로는 필요시 수정

  if (res.status !== 200) {
    throw new Error(`서버 에러: ${res.status}`);
  }

  return res.data;
};
