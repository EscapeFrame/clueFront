import { useState, useEffect, useCallback } from 'react';
import { noticeApi } from '@/features/Common/Main/api/useNotice';
import { NoticeItem } from '@/shared/types/notice';

interface UseNoticesReturn {
  serviceNotices: NoticeItem[];
  schoolNotices: NoticeItem[];
  scheduleNotices: NoticeItem[];
  loading: {
    service: boolean;
    school: boolean;
    schedule: boolean;
  };
  error: {
    service: string | null;
    school: string | null;
    schedule: string | null;
  };
  refetch: {
    service: () => Promise<void>;
    school: () => Promise<void>;
    schedule: () => Promise<void>;
    all: () => Promise<void>;
  };
}

export const useNotices = (): UseNoticesReturn => {
  const [serviceNotices, setServiceNotices] = useState<NoticeItem[]>([]);
  const [schoolNotices, setSchoolNotices] = useState<NoticeItem[]>([]);
  const [scheduleNotices, setScheduleNotices] = useState<NoticeItem[]>([]);
  
  const [loading, setLoading] = useState({
    service: true,
    school: true,
    schedule: true,
  });
  
  const [error, setError] = useState<{
    service: string | null;
    school: string | null;
    schedule: string | null;
  }>({
    service: null,
    school: null,
    schedule: null,
  });

  const fetchServiceNotices = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, service: true }));
      setError(prev => ({ ...prev, service: null }));
      
      const result = await noticeApi.getServiceNotices();
      
      if (typeof result === 'number') {
        setError(prev => ({
          ...prev,
          service: `서비스 공지를 불러오는데 실패했습니다. (상태코드: ${result})`
        }));
        setServiceNotices([]);
        return;
      }
      
      setServiceNotices(result);
    } catch (err) {
      console.error('서비스 공지 조회 중 오류 발생:', err);
      setError(prev => ({
        ...prev,
        service: '서비스 공지를 불러오는 중 오류가 발생했습니다.'
      }));
      setServiceNotices([]);
    } finally {
      setLoading(prev => ({ ...prev, service: false }));
    }
  }, []);

  const fetchSchoolNotices = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, school: true }));
      setError(prev => ({ ...prev, school: null }));
      
      const result = await noticeApi.getSchoolNotices();
      
      if (typeof result === 'number') {
        setError(prev => ({
          ...prev,
          school: `학교 공지를 불러오는데 실패했습니다. (상태코드: ${result})`
        }));
        setSchoolNotices([]);
        return;
      }
      
      setSchoolNotices(result);
    } catch (err) {
      console.error('학교 공지 조회 중 오류 발생:', err);
      setError(prev => ({
        ...prev,
        school: '학교 공지를 불러오는 중 오류가 발생했습니다.'
      }));
      setSchoolNotices([]);
    } finally {
      setLoading(prev => ({ ...prev, school: false }));
    }
  }, []);

  const fetchScheduleNotices = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, schedule: true }));
      setError(prev => ({ ...prev, schedule: null }));
      
      const result = await noticeApi.getScheduleNotices();
      
      if (typeof result === 'number') {
        setError(prev => ({
          ...prev,
          schedule: `일정 안내를 불러오는데 실패했습니다. (상태코드: ${result})`
        }));
        setScheduleNotices([]);
        return;
      }
      
      setScheduleNotices(result);
    } catch (err) {
      console.error('일정 안내 조회 중 오류 발생:', err);
      setError(prev => ({
        ...prev,
        schedule: '일정 안내를 불러오는 중 오류가 발생했습니다.'
      }));
      setScheduleNotices([]);
    } finally {
      setLoading(prev => ({ ...prev, schedule: false }));
    }
  }, []);

  const refetchAll = useCallback(async () => {
    await Promise.all([
      fetchServiceNotices(),
      fetchSchoolNotices(),
      fetchScheduleNotices(),
    ]);
  }, [fetchServiceNotices, fetchSchoolNotices, fetchScheduleNotices]);

  useEffect(() => {
    refetchAll();
  }, [refetchAll]);

  return {
    serviceNotices,
    schoolNotices,
    scheduleNotices,
    loading,
    error,
    refetch: {
      service: fetchServiceNotices,
      school: fetchSchoolNotices,
      schedule: fetchScheduleNotices,
      all: refetchAll,
    },
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