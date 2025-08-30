import { useState, useEffect } from 'react';
import { ScheduleItem } from '@/shared/types/schedule';
import { timetableApi } from '../api/TimeTable';

export const useSchedule = (grade: number, classNumber: number) => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!grade || !classNumber) return;

    const fetchSchedule = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await timetableApi.getWeeklyTimetable(grade, classNumber);

        if (Array.isArray(data)) {
          setSchedule(data);
        } else {
          setError(`Unexpected response status: ${data}`);
        }
      } catch (err) {
        console.error('스케줄 로딩 실패:', err);
        setError('스케줄 로딩 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [grade, classNumber]);

  return { schedule, loading, error };
};