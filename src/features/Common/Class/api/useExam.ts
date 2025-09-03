import Customapi from '@/shared/config/api';
import { Exam } from '@/shared/types/Class/Exam';

// 시험 목록 가져오기
export const ExamApi = async (examNumber: string): Promise<Exam[]> => {
  const res = await Customapi.get(`/api/exam/${examNumber}`); // API 경로는 필요시 수정

  if (res.status !== 200) {
    throw new Error(`서버 에러: ${res.status}`);
  }

  return res.data;
};