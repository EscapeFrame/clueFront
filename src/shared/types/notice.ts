import { SetStateAction } from "react";

export interface NoticeItem {
  createdAt: any;
  type: "SCHEDULE" | "SCHOOL" | "SERVICE";
  noticeId: string;
  title: string;
}

export interface NoticeDocument {
  noticeDocumentId: string;
  title: string;
  type: "FILE" | "LINK";
}

export interface DetailNoticeItem extends NoticeItem {
  content: string;
  noticeDocuments: NoticeDocument[];
}

export interface PostNoticeItem {
  metadata: {
    type: string;
    title: string;
    content: string;
    fileInfo?: {
      title?: string;
    }[];
    urls?: {
      value?: string;
      title?: string;
    }[];
  };
  files?: File[];
}
