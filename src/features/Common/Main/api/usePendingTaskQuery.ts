import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Customapi from '@/shared/config/api';
import { PendingTaskItem } from '@/shared/types/task';
import { logger } from '@/shared/utils/logger';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

// API 함수들
const fetchPendingTasks = async (): Promise<PendingTaskItem[]> => {
  try {
    const response = await Customapi.get('/api/pending-tasks');

    if (response.status < 200 || response.status >= 300) {
      logger.error(`미제출 과제 조회 실패: status ${response.status}`);
      return [];
    }

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    logger.error('미제출 과제 조회 실패:', error);
    throw error;
  }
};

const submitTaskRequest = async (submissionId: string): Promise<void> => {
  const response = await Customapi.post(`/api/submissions/${submissionId}/submit`);

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`과제 제출 실패: status ${response.status}`);
  }
};

// React Query 훅
export const usePendingTasksQuery = () => {
  return useQuery<PendingTaskItem[], Error>({
    queryKey: ['pendingTasks'],
    queryFn: fetchPendingTasks,
    staleTime: FIVE_MINUTES_IN_MS, // 5분 동안 fresh 상태 유지
    gcTime: FIVE_MINUTES_IN_MS * 2, // 10분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재호출 방지
    refetchOnMount: false, // 마운트 시 재호출 방지 (stale이 아닌 경우)
  });
};

// 과제 제출 Mutation
export const useSubmitTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitTaskRequest,
    onSuccess: () => {
      // 성공 시 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['pendingTasks'] });
    },
    onError: (error) => {
      logger.error('과제 제출 중 오류 발생:', error);
    },
  });
};
