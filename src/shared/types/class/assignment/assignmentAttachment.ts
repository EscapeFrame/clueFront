// 첨부파일/링크 전체 조회
export interface AttachmentResponse {
    contentType?: string;
    originalFileName?: string; // 과제 파일명
    size?: number;
    type: string; // 과제
    value: string; // 파일 경로 혹은 url
    [property: string]: any;
}

// 과제 제출 전체•단일 조회(Submission)
export interface SubmissionResponse {
    endDate: string; // 과제 마감일
    isSubmitted: string; // 제출여부
    startDate: string; // 과제 시작 일자
    submittedAt: string; // 제출일
    title: string; // 과제 제목
    userName: string; // 제출자명
    [property: string]: any;
}

// 과제 미제출 조회
export interface UnsubmittedResponse {
    assignmentId: number; // 과제 아이디
    endDate: string; // 과제 마감일
    startDate: string; // 과제 시작일
    title: string; // 과제 제목
    [property: string]: any;
}

// 과제 제출여부 확인(선생님)
export interface TeacherSubmissionCheckResponse {
    student: Student[];
    [property: string]: any;
}

export interface Student {
    classNumberGrade: number; // 학생 학번
    contentId: number; // 과제 아이디
    isSubmitted: boolean; // 제출여부
    userName: string; // 학생명
    [property: string]: any;
}

// 특정 학생 과제보기
export interface StudentAssignmentResponse {
    files: File[];
    isSubmitted: null | string;
    studentNumber: string;
    submittedAt: null | string;
    userName: string;
    [property: string]: any;
}

export interface File {
    fileId?: number | null;
    fileName?: null | string;
    fileSize?: number | null;
    [property: string]: any;
}