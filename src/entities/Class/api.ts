import Customapi from "@/shared/config/api";

// <--Class-->
// 과제 파일 제출 API
export async function submitFile(submissionId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return Customapi.post(`/api/submissions/${submissionId}/file`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

// 과제 링크 제출 API
export async function submitLink(submissionId: string, link: string) {
    return Customapi.post(`/api/submissions/${submissionId}/link`, { value: link });
}

// 과제 최종 제출 API
export async function finalizeSubmission(submissionId: string) {
    const submissionData = {
        submissionId: submissionId,
        IsSubmitted: true,
        submittedAt: new Date().toISOString(),
    };
    return Customapi.patch(`/api/submissions/${submissionId}/submit`, submissionData);
}

// 과제 제출 취소 API
export async function cancelSubmission(submissionId: string) {
    return Customapi.patch(`/api/submissions/${submissionId}/cancel`);
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
        const response = await Customapi.get(`/api/submissions/${assignmentId}/check`);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch (error) {
        console.error('학생 제출 현황 조회 실패:', error);
        throw error;
    }
}

// 학생 과제 상세 정보 조회 API
export async function getStudentSubmissionDetail(submissionId: string) {
    try {
        const response = await Customapi.get(`/api/submissions/assignment/${submissionId}`);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch (error) {
        console.error('학생 과제 상세 정보 조회 실패:', error);
        throw error;
    }
}