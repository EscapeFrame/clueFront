import Customapi from '@/shared/config/api';
import { ClassResponse } from '@/shared/types/class/class';

export const fetchClasses = async (): Promise<ClassResponse[]> => {
  const res = await Customapi.get('/api/class');
  if (res.status !== 200) throw new Error(`학습실 조회 실패: 상태 코드 ${res.status}`);
  return Array.isArray(res.data) ? res.data : [];
};

export const joinClassroomByCode = async (code: string): Promise<ClassResponse> => {
  const res = await Customapi.get(`/api/class/${code}/members`);
  if (res.status !== 200) throw new Error('학습실 참여 실패');
  return res.data;
};
