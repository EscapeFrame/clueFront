import api from '@/shared/config/api';
import { PendingTaskItem } from '@/shared/types/task';

export const fetchPosts = async (): Promise<PendingTaskItem[]> => {
  const response = await api.get<PendingTaskItem[]>('/tasks'); // API 엔드포인트
  return response.data;
};