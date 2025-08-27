import { useEffect, useState } from 'react';
import { ScheduleItem } from '@/shared/types/timetable';
import { fetchTimeline } from '@/features/Common/Main/api/timetable';

export const useTimeline = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        const data = await fetchTimeline();
        setSchedule(data);
        setError('');
      } catch (err: any) {
        setError(err.message || '주간 시간표 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };

    loadTimeline();
  }, []);

  return { schedule, loading, error };
};