import CustomApi from "@/shared/config/api";

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