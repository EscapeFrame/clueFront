import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noticeApi } from './useNotice';
import { NoticeItem, DetailNoticeItem, PostNoticeItem } from '@/shared/types/notice';
import { logger } from '@/shared/utils/logger';

const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

// 전체 공지사항 조회
export const useNoticesQuery = () => {
  return useQuery<NoticeItem[], Error>({
    queryKey: ['notices'],
    queryFn: async () => {
      const result = await noticeApi.getAllNotices();

      if (typeof result === 'number') {
        throw new Error(`공지사항을 불러오는데 실패했습니다. (상태코드: ${result})`);
      }

      return result;
    },
    staleTime: TEN_MINUTES_IN_MS, // 10분 동안 fresh 상태 유지
    gcTime: TEN_MINUTES_IN_MS * 2, // 20분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재호출 방지
    refetchOnMount: false, // 마운트 시 재호출 방지
  });
};

// 공지사항 타입별로 분류하는 유틸리티 함수
export const categorizeNotices = (notices: NoticeItem[]) => {
  return {
    serviceNotices: notices.filter((n) => n.type === 'SERVICE'),
    schoolNotices: notices.filter((n) => n.type === 'SCHOOL'),
    scheduleNotices: notices.filter((n) => n.type === 'SCHEDULE'),
  };
};

// 특정 공지사항 상세 조회
export const useNoticeDetailQuery = (noticeId: string, enabled = true) => {
  return useQuery<DetailNoticeItem, Error>({
    queryKey: ['notice', noticeId],
    queryFn: async () => {
      const result = await noticeApi.getNoticeDetail(noticeId);

      if (typeof result === 'number') {
        throw new Error(`공지사항을 불러오는데 실패했습니다. (상태코드: ${result})`);
      }

      return result;
    },
    enabled: !!noticeId && enabled, // noticeId가 있고 enabled가 true일 때만 실행
    staleTime: TEN_MINUTES_IN_MS,
    gcTime: TEN_MINUTES_IN_MS,
  });
};

// 공지사항 생성 Mutation
export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostNoticeItem) => noticeApi.postNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
    },
    onError: (error) => {
      logger.error('공지사항 생성 중 오류:', error);
    },
  });
};

// 공지사항 수정 Mutation
export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { noticeId: string; metadata: PostNoticeItem['metadata']; files?: File[] }) =>
      noticeApi.patchNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
    },
    onError: (error) => {
      logger.error('공지사항 수정 중 오류:', error);
    },
  });
};

// 공지사항 삭제 Mutation
export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noticeId: string) => noticeApi.deleteNotice(noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
    },
    onError: (error) => {
      logger.error('공지사항 삭제 중 오류:', error);
    },
  });
};
