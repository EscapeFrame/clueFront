import { useState, useEffect, useCallback } from 'react';
import { noticeApi } from '@/features/Common/Main/api/useNotice';
import { NoticeItem } from '@/shared/types/notice';

interface UseNoticesReturn {
  serviceNotices: NoticeItem[];
  schoolNotices: NoticeItem[];
  scheduleNotices: NoticeItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useNotices = (): UseNoticesReturn => {
  const [serviceNotices, setServiceNotices] = useState<NoticeItem[]>([]);
  const [schoolNotices, setSchoolNotices] = useState<NoticeItem[]>([]);
  const [scheduleNotices, setScheduleNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllNotices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await noticeApi.getAllNotices();

      if (typeof result === 'number') {
        setError(`공지사항을 불러오는데 실패했습니다. (상태코드: ${result})`);
        setServiceNotices([]);
        setSchoolNotices([]);
        setScheduleNotices([]);
        return;
      }

      // type 기준으로 분류
      const service = result.filter((n: NoticeItem) => n.type === 'Service');
      const school = result.filter((n: NoticeItem) => n.type === 'School');
      const schedule = result.filter((n: NoticeItem) => n.type === 'Schedule');

      setServiceNotices(service);
      setSchoolNotices(school);
      setScheduleNotices(schedule);
    } catch (err) {
      console.error('공지사항 조회 중 오류 발생:', err);
      setError('공지사항을 불러오는 중 오류가 발생했습니다.');
      setServiceNotices([]);
      setSchoolNotices([]);
      setScheduleNotices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNotices();
  }, [fetchAllNotices]);

  return {
    serviceNotices,
    schoolNotices,
    scheduleNotices,
    loading,
    error,
    refetch: fetchAllNotices,
  };
};

// 개별 공지사항 상세 조회 훅
interface UseNoticeDetailReturn {
  notice: NoticeItem | null;
  loading: boolean;
  error: string | null;
  fetchNoticeDetail: (noticeId: number) => Promise<void>;
}

export const useNoticeDetail = (): UseNoticeDetailReturn => {
  const [notice, setNotice] = useState<NoticeItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticeDetail = useCallback(async (noticeId: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await noticeApi.getNoticeDetail(noticeId);
      
      if (typeof result === 'number') {
        setError(`공지사항을 불러오는데 실패했습니다. (상태코드: ${result})`);
        setNotice(null);
        return;
      }
      
      setNotice(result);
    } catch (err) {
      console.error('공지사항 상세 조회 중 오류 발생:', err);
      setError('공지사항을 불러오는 중 오류가 발생했습니다.');
      setNotice(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    notice,
    loading,
    error,
    fetchNoticeDetail,
  };
};