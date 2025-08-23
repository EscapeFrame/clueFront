import { NoticeItem } from '@/shared/types/notice';

export const serviceNotices: NoticeItem[] = [
  { 
    id: '1', 
    title: '서비스 점검 안내', 
    content: '내일 오전 2시부터 4시까지 점검 예정', 
    date: '2025-07-20',
    notes: undefined, // 일반 텍스트 (모달에 content 보여줌)
  },
  { 
    id: '2', 
    title: '새 기능 업데이트', 
    content: '이번 주 금요일 새로운 기능 추가', 
    date: '2025-07-18',
    notes: undefined, 
  },
];

export const schoolNotices: NoticeItem[] = [
  { 
    id: '1', 
    title: '여름방학 일정', 
    content: '7월 25일부터 8월 15일까지 여름방학입니다.', 
    date: '2025-07-10',
    notes: undefined, 
  },
  { 
    id: '2', 
    title: '학교 축제 안내', 
    content: '9월 1일 축제 참여 신청하세요.', 
    date: '2025-07-15',
    notes: undefined,
  },
];

export const scheduleNotices: NoticeItem[] = [
  { 
    id: '1', 
    title: '중간고사 일정', 
    content: '8월 20일부터 8월 25일까지 진행', 
    date: '2025-07-12',
    notes: undefined, 
  },
  { 
    id: '2', 
    title: '졸업식 안내', 
    content: '12월 15일 강당에서 진행', 
    date: '2025-07-16',
    notes: undefined, 
  },
];