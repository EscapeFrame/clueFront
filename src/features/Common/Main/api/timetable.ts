import Customapi from '@/shared/config/api';
import { ScheduleItem } from '@/shared/types/timetable';

export const fetchTimeline = async (): Promise<ScheduleItem[]> => {
  try {
    const res = await Customapi.get('/api/timetable/weekly');
    if (res.status !== 200) throw new Error(`주간 시간표 조회 실패: ${res.status}`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error('주간 시간표 API 호출 실패:', err);
    throw err;
  }
};