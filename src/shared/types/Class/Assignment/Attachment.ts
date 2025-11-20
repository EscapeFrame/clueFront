import { ReactNode } from "react";

// 과제 첨부
export interface AssignmentAttachment {
  assignmentAttachmentId: string;
  contentType?: string;
  originalFileName?: string; // 과제 파일 이름
  size?: number;
  type: string; // 과제 타입
  value: string; // 파일 경로 혹은 url
}

// 과제 파일 타입 (다운로드 등 용도)
export interface AssignmentFileType {
  fileId: string;
  fileName: string;
  fileSize: number;
}

// 특정 학생 과제보기 - 파일
export interface AssignmentFile {
  name: ReactNode;
  url: string | undefined;
  fileId?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
}

// 과제 제출 전체•단일 조회
export interface SubmissionResponse {
  endDate: string; // 과제 마감일
  isSubmitted: string; // 제출여부
  startDate: string; // 과제 시작일
  submittedAt: string; // 제출일
  title: string; // 과제 제목
  userName: string; // 제출자명
}

// 과제 미제출 조회
export interface UnsubmittedResponse {
  assignmentId: number; // 과제 아이디
  endDate: string; // 과제 마감일
  startDate: string; // 과제 시작일
  title: string; // 과제 제목
}

// 과제 제출여부 확인(선생님용)
export interface TeacherSubmissionCheckResponse {
  student: Student[];
}

export interface Student {
  classNumberGrade: number; // 학생 학번
  contentId: number; // 과제 아이디
  isSubmitted: boolean; // 제출여부
  userName: string; // 학생명
}

// 특정 학생 과제보기
export interface StudentAssignmentResponse {
  files: File[];
  isSubmitted: null | string;
  studentNumber: string;
  submittedAt: null | string;
  userName: string;
}

// 과제 타입 (AssignmentCard에서 사용하는 타입)
export interface Assignment {
  assignmentId: string | number;
  title: string;
  content: string;
  description: string;
  deadline: string;
  duringDate?: string;
  endDate?: string;
  remainingTime?: string;
  isSubmitted?: boolean;
  submissionDate?: string | null;
  files?: AssignmentFileType[] | (string | null)[];
}

// AssignmentCard Props
export interface AssignmentCardProps {
  data: Assignment;
  updateAssignment: (id: string | number, changes: Partial<Assignment>) => void;
  onClickDetail?: () => void;
}

// AssignmentComponent Props (필요하면)
export interface AssignmentComponentProps {
  // 예시로 id 하나만 넣음, 필요에 따라 확장하세요
  classId: string;
}

// DetailAssignment에 필요한 학생 제출 현황 타입
export interface DetailAssignmentStudent {
  userName: string;          // 학생 이름
  grade: number;             // 학년
  classNo: number;           // 반
  number: number;            // 번호
  isSubmitted: boolean;      // 제출 여부
  submissionId: string;      // 제출 아이디 (API의 submissionId에 해당)
  files?: AssignmentFile[];
  userImg?: string | null;   // 이미지 URL
  submittedAt?: string | null; // 제출일 (API의 submittedAt에 해당)
}

// DetailAssignment API/컴포넌트 전체 타입
export interface DetailAssignmentData {
  student: DetailAssignmentStudent[];
}