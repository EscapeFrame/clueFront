import Customapi from '@/shared/config/api';
import {
  AssignmentResponse, AssignmentCreateRequest,
  AssignmentUpdateRequest, AssignmentDeleteResponse
} from '@/shared/types/Class/Assignment/Assignment';

const API_BASE_URL = '/api/assignments';

export const AssignmentsApi = {
  getAll: async (classId: string): Promise<AssignmentResponse[]> => {
    try {
      const res = await Customapi.get<AssignmentResponse[]>(`${API_BASE_URL}/${classId}/all`);
      if (res.status !== 200) {
        console.error(`과제 불러오기 실패: status ${res.status}`);
        return [];
      }
      return res.data;
    } catch (error: any) {
      console.error('과제 불러오기 실패:', error);
      return [];
    }
  },
  create: async (assignment: AssignmentCreateRequest): Promise<AssignmentResponse | null> => {
    try {
      const res = await Customapi.post<AssignmentResponse>(`${API_BASE_URL}`, assignment);
      if (res.status !== 200) {
        console.error(`과제 생성 실패: status ${res.status}`);
        return null;
      }
      return res.data;
    } catch (error: any) {
      console.error('과제 생성 실패:', error);
      return null;
    }
  },
  update: async (assignmentId: string | number, changes: AssignmentUpdateRequest): Promise<AssignmentResponse | null> => {
    try {
      const res = await Customapi.patch<AssignmentResponse>(`${API_BASE_URL}/${assignmentId}`, changes);
      if (res.status !== 200) {
        console.error(`과제 수정 실패: status ${res.status}`);
        return null;
      }
      return res.data;
    } catch (error: any) {
      console.error('과제 수정 실패:', error);
      return null;
    }
  },
  delete: async (assignmentId: number): Promise<AssignmentDeleteResponse | null> => {
    try {
      const res = await Customapi.delete<AssignmentDeleteResponse>(`${API_BASE_URL}/${assignmentId}`);
      if (res.status !== 200) {
        console.error(`과제 삭제 실패: status ${res.status}`);
        return null;
      }
      return res.data;
    } catch (error: any) {
      console.error('과제 삭제 실패:', error);
      return null;
    }
  },

  // 과제 제출 여부 조회
  checkSubmission: async (
    assignmentId: string | number
  ): Promise<{ submitted: boolean } | null> => {
    try {
      const res = await Customapi.get<{ submitted: boolean }>(`${API_BASE_URL}/${assignmentId}/check`);
      if (res.status !== 200) {
        console.error(`과제 제출 여부 조회 실패: status ${res.status}`);
        return null;
      }
      return res.data;
    } catch (error: any) {
      console.error('과제 제출 여부 조회 실패:', error);
      return null;
    }
  },
};