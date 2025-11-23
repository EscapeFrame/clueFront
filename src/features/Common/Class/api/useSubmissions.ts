import Customapi from '@/shared/config/api';
import { StudentSubmission } from '@/shared/types/submission';

const API_BASE_URL = '/api/submissions';

export const SubmissionsApi = {
  getAllForStudent: async (classId: string): Promise<StudentSubmission[]> => {
    try {
      const res = await Customapi.get<StudentSubmission[]>(`${API_BASE_URL}/${classId}`);
      if (res.status < 200 || res.status >= 300) {
        console.error(`학생 과제 목록 불러오기 실패: status ${res.status}`);
        return [];
      }
      return res.data;
    } catch (error) {
      console.error('학생 과제 목록 불러오기 실패:', error);
      return [];
    }
  },
};
