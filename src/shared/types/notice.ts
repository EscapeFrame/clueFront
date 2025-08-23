export interface NoticeItem {
  notes?: 'registration' | 'codeInput' | 'fileUpload' | 'warning' | string; // 모달 타입
  id: string;
  title: string;        // 공지 제목
  content: string;      // 공지 내용
  date: string;         // 공지 날짜 (YYYY-MM-DD)
}