import { useState, useEffect } from 'react';
import { ScheduleItem } from '@/shared/types/timetable';
import * as api from '../api/useSchedule';

interface UseTimelineProps {
  grade: string;
  classNumber: string;
}

interface UseTimelineResult {
  schedule: ScheduleItem[];
  loading: boolean;
  error: string;
}

export const useTimeline = ({ grade, classNumber }: UseTimelineProps): UseTimelineResult => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!grade || !classNumber) return;

    const loadSchedule = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await api.fetchWeeklyTimeline(grade, classNumber);
        setSchedule(data ?? []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || '시간표 로딩 실패');
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, [grade, classNumber]);

  return { schedule, loading, error };
};