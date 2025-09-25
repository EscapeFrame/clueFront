import CustomApi from "@/shared/config/api";

// <-- timeline api -->
export const timetableApi = {
  getWeeklyTimetable: async ()=> {
    try {
      const res = await CustomApi.get(`/api/timetable/weekly`);
      if (res.status !== 200) return res.status;
      return res.data;
    } catch (error) {
      console.error('주간 시간표 조회 실패:', error);
      throw error;
    }
  }
};