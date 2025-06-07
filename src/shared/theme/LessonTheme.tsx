export interface LessonItem {
  id: number;
  title: string;
  isRead: boolean;
  url?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  count: number;
  items: LessonItem[];
  isExpanded?: boolean; // UI 상태라면 컴포넌트에서 관리해도 됨
}

// 데이터 정의 (초기값)
export const Lessons: LessonSection[] = [
  {
    id: 'first',
    title: '1차시 오리엔테이션',
    count: 1,
    items: [
      { id: 1, title: '자바란 무엇인가?', isRead: true, url: '/lesson/java-intro' }
    ],
  },
  {
    id: 'second',
    title: '2차시',
    count: 3,
    items: [
      { id: 2, title: '아야아', isRead: false, url: '/lesson/aya1' },
      { id: 3, title: '아야아아', isRead: false, url: '/lesson/aya2' },
      { id: 4, title: '아야아아아', isRead: false, url: '/lesson/aya3' },
    ],
  },
];