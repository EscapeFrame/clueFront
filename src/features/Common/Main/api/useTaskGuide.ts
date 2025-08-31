import api from '@/shared/config/api';
import { PendingTaskItem } from '@/shared/types/task';

// 아직 없음
export const fetchPosts = async (): Promise<PendingTaskItem[]> => {
  const response = await api.get<PendingTaskItem[]>('/api/tasks');

  if (!Array.isArray(response.data)) {
    console.error('API 응답이 배열 아님:', response.data);
    return [];
  }

  return response.data;
};