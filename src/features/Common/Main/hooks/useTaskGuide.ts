import { useEffect, useState } from 'react';
import { Post } from '@/shared/types/task';
import * as api from '../api/useTaskGuide';

export const useTaskGuide = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await api.fetchTaskGuidePosts();
        setPosts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || '수행평가 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading, error };
};