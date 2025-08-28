import Customapi from '@/shared/config/api';
import { 
  AssignmentResponse, 
  AssignmentCreateRequest,
  AssignmentUpdateRequest
} from '@/shared/types/class/assignment/assignment';

// 특정 클래스의 과제 목록 조회
export const fetchAssignments = async (classRoomId: string): Promise<AssignmentResponse[]> => {
  const res = await Customapi.get<AssignmentResponse[]>(`/api/assignments/${classRoomId}`);
  return res.data;
};

// 전체 과제 목록 조회
export const fetchAllAssignments = async (classId: string): Promise<AssignmentResponse[]> => {
  const res = await Customapi.get<AssignmentResponse[]>(`/api/assignments/${classId}/all`);
  return res.data;
};

// 과제 생성
export const createAssignment = async (payload: AssignmentCreateRequest): Promise<AssignmentResponse> => {
  const res = await Customapi.post<AssignmentResponse>('/api/assignments', payload);
  return res.data;
};

// 과제 수정
export const updateAssignment = async (
  assignmentId: number, 
  payload: AssignmentUpdateRequest
): Promise<AssignmentResponse> => {
  const res = await Customapi.put<AssignmentResponse>(`/api/assignments/${assignmentId}`, payload);
  return res.data;
};