import { useEffect, useState } from 'react';
import { Post } from '@/shared/types/task';
import * as api from '../api/usePendingTask';

export const usePendingTasks = () => {
  const [tasks, setTasks] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const data = await api.fetchPendingTasks();
        setTasks(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || '미제출 과제 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return { tasks, loading, error };
};