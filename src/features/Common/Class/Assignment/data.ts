import { Assignment } from '@/shared/types/classroom';

export const assignments: Assignment[] = [
  {
    id: '1',
    title: '클래스와 객체 문제 풀이',
    deadline: '2024-03-20',
    duringDate: '2024-03-01',
    endDate: '2024-03-20',
    remainingTime: '3일 남음',  // 여기에 추가
    isSubmitted: true,
    submissionDate: '2024-03-17',
    description: 'Java 클래스 개념 설명과 예제 코드 작성.',
    files: ['ClassExample.java'],
    uploadedFiles: [],
  },
  {
    id: '2',
    title: '상속과 다형성 실습',
    deadline: '2024-03-25',
    duringDate: '2024-03-10',
    endDate: '2024-03-25',
    remainingTime: '8일 남음', 
    isSubmitted: false,
    description: '상속과 다형성 활용한 Java 프로그램 작성.',
    files: [],
    uploadedFiles: [],
  },
];