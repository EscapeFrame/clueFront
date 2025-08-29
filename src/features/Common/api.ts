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

// <-- 유저 정보 가져오기 -->
export async function setting(assignmentId: string) {
    try {
        const response = await CustomApi.delete(`/api/assignments/submit/${assignmentId}`);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch(error) {
        console.error('과제 제출 취소 실패:', error);
        throw error
    }
}