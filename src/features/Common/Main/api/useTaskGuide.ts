import api from '@/shared/config/api';
import { PendingTaskItem } from '@/shared/types/task';

// 아직 없음
export const fetchPosts = async (): Promise<PendingTaskItem[]> => {
  const response = await api.get<PendingTaskItem[]>('/api/tasks');
  return response.data;
};