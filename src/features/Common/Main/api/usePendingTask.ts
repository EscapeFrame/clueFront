import CustomApi from '@/shared/config/api';
import { Post } from '@/shared/types/task';

export const fetchPendingTasks = async (): Promise<Post[]> => {
  const res = await CustomApi.get('/api/pending-tasks'); // 실제 API 엔드포인트 교체
  if (res.status !== 200) throw new Error('미제출 과제 조회 실패');
  return res.data;
};