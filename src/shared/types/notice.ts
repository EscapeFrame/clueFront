export interface NoticeItem {
  type: 'Schedule' | 'School' | 'Service';
  noticeId: string;
  title: string;        // 공지 제목
  content: string;      // 공지 내용
  createdAt: string;         // 공지 날짜 (YYYY-MM-DD)
}