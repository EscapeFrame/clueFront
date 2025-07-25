import { Directory, NewsItem, QuestionItem } from '@/shared/types/classroom';

export const directories: Directory[] = [
  {
    id: '1',
    name: '1주차 - Java 기본 문법',
    isRead: false,
    subDirectories: [
      { id: 'lesson1', name: '오리엔테이션(한글)', isRead: true },
      { id: 'lesson2', name: '변수와 자료형(PPT)', isRead: false },
      { id: 'lesson3', name: '조건문과 반복문(마크다운)', isRead: false },
      { id: 'lesson4', name: '간단한 실습 문제(컴파일러)', isRead: false }
    ]
  },
  {
    id: '2',
    name: '2주차 - 객체지향 프로그래밍',
    isRead: false,
    subDirectories: [
      { id: 'lesson11', name: '클래스와 객체', isRead: false },
      { id: 'lesson22', name: '상속과 다형성', isRead: false }
    ]
  }
];

export const news: NewsItem[] = [
  { id: '1', title: '중간고사 일정 안내', content: '중간고사는 다음주 월요일에 진행됩니다...', date: '2025-08-01' },
  { id: '2', title: '과제 제출 기한 연장', content: '과제 제출 기한이 이틀 연장되었습니다...', date: '2025-07-30' }
];

export const questions: QuestionItem[] = [
  { id: '1', title: '상속 개념 질문', content: '상속이 정확히 어떻게 동작하는지 궁금합니다.', author: '박학생', date: '2025-07-25' },
  { id: '2', title: '반복문 사용법', content: 'for문과 while문의 차이점이 뭔가요?', author: '최학생', date: '2025-07-24' }
];