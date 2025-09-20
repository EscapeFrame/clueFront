import Customapi from "@/shared/config/api";

// <--Class-->
// 과제 제출 API
export async function SubmitAssignment(assignmentId: string, file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await Customapi.post(`/api/assignments/submit/${assignmentId}`, formData);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch (error) {
        console.error('과제 제출 실패:', error);
        throw error;
    }
}

// 과제 제출 취소 API
export async function DeleteAssignment(assignmentId: string) {
    try {
        const response = await Customapi.delete(`/api/assignments/submit/${assignmentId}`);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch(error) {
        console.error('과제 제출 취소 실패:', error);
        throw error
    }
}

//<--ClassInfo-->
// 클래스 정보 조회 API
export async function getClassInfo(classroomId: string) {
    try {
        const response = await Customapi.get(`/api/class/${classroomId}`);
        if (response.status !== 200) {
            return response.status;
        }
        console.log("넘어온 값들",response.data)
        return response.data;
    } catch (error) {
        console.error('클래스 정보 조회 실패:', error);
        throw error;
    }
}

export async function getCheckStudent(assignmentId: string) {
    try {
        const response = await Customapi.get(`/api/assignments/${assignmentId}/check`);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch (error) {
        console.error('학생 제출 현황 조회 실패:', error);
        throw error;
    }
}