import Customapi from "@/shared/config/api";

// <--Class-->
// 과제 파일 제출 API
export async function submitFile(submissionId: string, file: File) {
    const formData = new FormData();
    formData.append('files', file);
    return Customapi.post(`/api/submissions/${submissionId}/file`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

// 과제 링크 제출 API
export async function submitLink(submissionId: string, link: string) {
    return Customapi.post(`/api/submissions/${submissionId}/link`, { url: link });
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

// 과제 첨부파일 삭제 API
export async function deleteSubmissionAttachment(submissionAttachmentId: string) {
    return Customapi.delete(`/api/submissions/${submissionAttachmentId}`);
}

// 과제에 할당된 첨부파일 조회 API
export async function getAssignmentAttachments(assignmentId: string) {
    try {
        const response = await Customapi.get(`/api/assignments/${assignmentId}/attachment`);
        if (response.status !== 200) {
            return response.status;
        }
        return response.data;
    } catch (error) {
        console.error('과제 첨부파일 조회 실패:', error);
        throw error;
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

// 학생 제출 첨부파일 다운로드 (submissionAttachmentId 사용)
export async function downloadSubmissionAttachment(submissionAttachmentId: string) {
    try {
        const res = await Customapi.get(`/api/submissions/${submissionAttachmentId}/download`, { responseType: 'blob' });
        if (res.status < 200 || res.status >= 300) {
            console.error(`첨부파일 다운로드 실패: status ${res.status}`);
            return null;
        }
        const contentDisposition = res.headers?.['content-disposition'] as string | undefined;
        let filename: string | undefined = undefined;
        if (contentDisposition) {
            const match = contentDisposition.match(/filename\*=UTF-8''(.+)|filename="?([^";]+)"?/);
            if (match) filename = decodeURIComponent(match[1] || match[2]);
        }
        return { blob: res.data as Blob, filename };
    } catch (error) {
        console.error('첨부파일 다운로드 실패:', error);
        return null;
    }
}