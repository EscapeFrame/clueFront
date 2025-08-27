// 과제 전체•단일 조회
export interface AssignmentResponse {
    AssignmentAttachments: AssignmentAttachment[];
    assignmentId: number; // 과제 아이디
    content: string; // 과제 내용
    endDate: string; // 과제 마감일
    startDate: string; // 과제 시작일
    title: string; // 과제 제목
    userName: string; // 과제 생성자명
    [property: string]: any;
}

// 과제 첨부
export interface AssignmentAttachment {
    contentType?: string;
    originalFileName?: string; // 과제 파일이름
    size?: number;
    type: string; // 과제 타입
    value: string; // 파일 경로 혹은 url
    [property: string]: any;
}

// 과제 만들기
export interface AssignmentCreateRequest {
    class_id: number;
    content: string;
    end_date: string;
    start_date: string;
    title: string;
    [property: string]: any;
}

// 과제 수정
export interface AssignmentUpdateRequest {
    content: string;
    end_date: string;
    start_date: string;
    title: string;
    [property: string]: any;
}

// 과제 삭제
export interface AssignmentDeleteResponse {
    message: string;
    [property: string]: any;
}

export interface AssignmentFileType {
    fileId: number | string;
    fileName: string;
    fileSize: number;
  }