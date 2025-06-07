export interface InquiryItem {
  id: number;
  title: string;
  studentId: string;
  content: string;
}

export const inquiries: InquiryItem[] = [
  {
    id: 1,
    title: '수업 문의 드립니다',
    studentId: '홍길동',
    content: '수업 내용 좀 더 자세히 설명 부탁드립니다.'
  },
  {
    id: 2,
    title: '과제 질문 있어요',
    studentId: '김철수',
    content: '과제 제출기한이 언제인가요?'
  },
  {
    id: 3,
    title: '출석 관련',
    studentId: '이영희',
    content: '지각 처리 기준이 어떻게 되나요?'
  }
];