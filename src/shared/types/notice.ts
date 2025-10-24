export interface NoticeItem {
  type: "SCHEDULE" | "SCHOOL" | "SERVICE";
  noticeId: string;
  title: string; // 공지 제목
  content: string; // 공지 내용
  createdAt: string; // 공지 날짜 (YYYY-MM-DD)
}

export interface DetailNoticeItem extends NoticeItem {
  noticeDocuments : [
    {
      NoticeDocumentId: string;
      title: string;
    }
  ]
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
