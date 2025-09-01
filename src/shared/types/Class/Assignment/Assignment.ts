import {AssignmentAttachment } from './Attachment';

// 과제 전체•단일 조회
export interface AssignmentResponse {
  AssignmentAttachments: AssignmentAttachment[];
  assignmentId: number; // 과제 아이디
  content: string; // 과제 내용
  endDate: string; // 과제 마감일
  startDate: string; // 과제 시작일
  title: string; // 과제 제목
  userName: string; // 과제 생성자명
}

// 과제 만들기
export interface AssignmentCreateRequest {
  class_id: number;
  content: string;
  end_date: string;
  start_date: string;
  title: string;
}

// 과제 수정
export interface AssignmentUpdateRequest {
  content: string;
  end_date: string;
  start_date: string;
  title: string;
}

// 과제 삭제
export interface AssignmentDeleteResponse {
  message: string;
}