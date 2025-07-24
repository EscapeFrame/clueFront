import { useEffect, useState } from 'react';
import { ScheduleTime } from '@/shared/types/schedule';

export const useCurrentPeriod = () => {
  const [currentPeriod, setCurrentPeriod] = useState<number | null>(null);

  const getPeriod = () => {
    const now = new Date();
    const nowStr = now.toTimeString().slice(0, 5); // HH:mm

    for (const [period, { start, end }] of Object.entries(ScheduleTime)) {
      if (nowStr >= start && nowStr <= end) {
        return parseInt(period);
      }
    }
    return null;
  };

  useEffect(() => {
    setCurrentPeriod(getPeriod());

    const interval = setInterval(() => {
      setCurrentPeriod(getPeriod());
    }, 60000); // 1분마다 갱신

    return () => clearInterval(interval);
  }, []);

  return currentPeriod;
};