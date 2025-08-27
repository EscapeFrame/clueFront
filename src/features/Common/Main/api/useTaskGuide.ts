

import CustomApi from '@/shared/config/api';
import { Post } from '@/shared/types/task';

export const fetchTaskGuidePosts = async (): Promise<Post[]> => {
  const res = await CustomApi.get('/api/taskguide'); 
  if (res.status !== 200) throw new Error('수행평가 조회 실패');
  return res.data;
};
