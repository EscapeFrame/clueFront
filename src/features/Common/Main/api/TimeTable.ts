import CustomApi from "@/shared/config/api";
import { ScheduleItem } from '@/shared/types/schedule';

// <-- timeline api -->
export const timetableApi = {
  getWeeklyTimetable: async (grade: number, classNumber: number): Promise<ScheduleItem[] | number> => {
    try {
      const res = await CustomApi.get(`/api/timetable/weekly?grade=${grade}&classNumber=${classNumber}`);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('주간 시간표 조회 실패:', error);
      throw error;
    }
  }
};