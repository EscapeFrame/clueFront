import CustomApi from "@/shared/config/api";

// <-- timeline api -->
export const getScheduleTimeTable = async (grade: string, classNumber: string) => {
    try {
        const res = await CustomApi.get(`/api/timetable/weekly?${grade}&${classNumber}`);
        if (res.status !== 200) {
            return res.status;
        }
        return res.data;
    } catch (error) {
        console.error('스케줄 조회 실패:', error);
        throw error;
    }
}