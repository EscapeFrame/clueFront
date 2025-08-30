import { useState, useEffect, useCallback } from 'react';
import { pendingTasksApi } from '@/features/Common/Main/api/usePendingTask';
import { PendingTaskItem } from '@/shared/types/task';

interface UsePendingTasksReturn {
  tasks: PendingTaskItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  submitTask: (taskIndex: number) => Promise<void>;
  createTask: (task: PendingTaskItem) => Promise<void>;
}

export const usePendingTasks = (): UsePendingTasksReturn => {
  const [tasks, setTasks] = useState<PendingTaskItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await pendingTasksApi.getPendingTasks();
      
      // API에서 status code가 반환된 경우 (에러)
      if (typeof result === 'number') {
        setError(`과제를 불러오는데 실패했습니다. (상태코드: ${result})`);
        setTasks([]);
        return;
      }
      
      // 성공적으로 데이터를 받은 경우
      setTasks(result);
    } catch (err) {
      console.error('미제출 과제 조회 중 오류 발생:', err);
      setError('과제를 불러오는 중 오류가 발생했습니다.');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitTask = useCallback(async (taskIndex: number) => {
    try {
      const result = await pendingTasksApi.submitTask(String(taskIndex));
      
      if (typeof result === 'number') {
        throw new Error(`과제 제출에 실패했습니다. (상태코드: ${result})`);
      }
      
      // 제출 완료 후 목록 새로고침
      await fetchPendingTasks();
    } catch (err) {
      console.error('과제 제출 중 오류 발생:', err);
      throw err; // 컴포넌트에서 에러 처리할 수 있도록 다시 throw
    }
  }, [fetchPendingTasks]);

  const createTask = useCallback(async (task: PendingTaskItem) => {
    try {
      const result = await pendingTasksApi.createTask(task);
      
      if (typeof result === 'number') {
        throw new Error(`과제 생성에 실패했습니다. (상태코드: ${result})`);
      }
      
      // 생성 완료 후 목록 새로고침
      await fetchPendingTasks();
    } catch (err) {
      console.error('과제 생성 중 오류 발생:', err);
      throw err; // 컴포넌트에서 에러 처리할 수 있도록 다시 throw
    }
  }, [fetchPendingTasks]);

  const refetch = useCallback(async () => {
    await fetchPendingTasks();
  }, [fetchPendingTasks]);

  useEffect(() => {
    fetchPendingTasks();
  }, [fetchPendingTasks]);

  return {
    tasks,
    loading,
    error,
    refetch,
    submitTask,
    createTask
  };
};