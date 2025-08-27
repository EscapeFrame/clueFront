import Customapi from '@/shared/config/api';
import { 
  AssignmentResponse, 
  AssignmentCreateRequest,
  AssignmentUpdateRequest
} from '@/shared/types/class/assignment/assignment';

// 과제 조회
export const fetchAssignments = async (classRoomId: string): Promise<AssignmentResponse[]> => {
  const res = await Customapi.get(`/api/assignments/${classRoomId}`);
  if (res.status !== 200) throw new Error(`과제 조회 실패: 상태 코드 ${res.status}`);
  return res.data;
};

// 과제 생성
export const createAssignment = async (payload: AssignmentCreateRequest): Promise<AssignmentResponse> => {
  const res = await Customapi.post(`/api/assignments`, payload);
  if (res.status !== 200) throw new Error('과제 생성 실패');
  return res.data;
};

// 과제 수정
export const updateAssignment = async (assignmentId: number, payload: AssignmentUpdateRequest): Promise<AssignmentResponse> => {
  const res = await Customapi.put(`/api/assignments/${assignmentId}`, payload);
  if (res.status !== 200) throw new Error('과제 수정 실패');
  return res.data;
};