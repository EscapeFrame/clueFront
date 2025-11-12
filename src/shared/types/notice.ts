export interface NoticeItem {
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
