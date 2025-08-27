import { useEffect, useState } from 'react';
import { NoticeItem } from '@/shared/types/notice';
import * as api from '../api/useNotice';

export const useNotices = () => {
  const [serviceNotices, setServiceNotices] = useState<NoticeItem[]>([]);
  const [schoolNotices, setSchoolNotices] = useState<NoticeItem[]>([]);
  const [scheduleNotices, setScheduleNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadNotices = async () => {
      setLoading(true);
      try {
        const [service, school, schedule] = await Promise.all([
          api.fetchServiceNotices(),
          api.fetchSchoolNotices(),
          api.fetchScheduleNotices(),
        ]);

        setServiceNotices(service);
        setSchoolNotices(school);
        setScheduleNotices(schedule);
      } catch (err: any) {
        console.error(err);
        setError(err.message || '공지 조회 실패');
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  return { serviceNotices, schoolNotices, scheduleNotices, loading, error };
};