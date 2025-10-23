import { useState, useEffect } from 'react';

// 학습실 데이터 타입 정의
export interface MyClassData {
  classRoomId: string;
  name: string;
  description: string;
  sort: string;
  assignedClass?: string;
  categoryKey: 'sort' | 'professional' | 'afterSchool';
}

// 임시 더미 데이터
const dummyClasses: MyClassData[] = [
  { classRoomId: "CR001", name: "Mathematics Basics", description: "기초 수학 개념과 연산 학습", sort: "A", assignedClass: "1학년 A반", categoryKey: "sort" },
  { classRoomId: "CR002", name: "Advanced Physics", description: "물리학 심화 학습", sort: "A", assignedClass: "2학년 B반", categoryKey: "professional" },
  { classRoomId: "CR003", name: "Creative Writing", description: "창의적인 글쓰기와 표현력 향상", sort: "A", assignedClass: "3학년 C반", categoryKey: "afterSchool" },
  { classRoomId: "CR004", name: "Chemistry Lab", description: "실험 중심의 화학 학습", sort: "A", assignedClass: "2학년 A반", categoryKey: "professional" },
  { classRoomId: "CR005", name: "English Conversation", description: "영어 회화 능력 향상", sort: "A", assignedClass: "1학년 B반", categoryKey: "afterSchool" },
  { classRoomId: "CR006", name: "History of Art", description: "세계 미술사 이해", sort: "A", assignedClass: "3학년 A반", categoryKey: "sort" },
  { classRoomId: "CR007", name: "Computer Programming", description: "기초 코딩과 문제 해결 능력 향상", sort: "A", assignedClass: "2학년 C반", categoryKey: "professional" },
  { classRoomId: "CR008", name: "Music Ensemble", description: "합주를 통한 음악적 감각 개발", sort: "A", assignedClass: "1학년 C반", categoryKey: "afterSchool" },
  { classRoomId: "CR001", name: "Mathematics Basics", description: "기초 수학 개념과 연산 학습", sort: "A", assignedClass: "1학년 A반", categoryKey: "sort" },
  { classRoomId: "CR002", name: "Advanced Physics", description: "물리학 심화 학습", sort: "A", assignedClass: "2학년 B반", categoryKey: "professional" },
  { classRoomId: "CR003", name: "Creative Writing", description: "창의적인 글쓰기와 표현력 향상", sort: "A", assignedClass: "3학년 C반", categoryKey: "afterSchool" },
  { classRoomId: "CR004", name: "Chemistry Lab", description: "실험 중심의 화학 학습", sort: "A", assignedClass: "2학년 A반", categoryKey: "professional" },
  { classRoomId: "CR005", name: "English Conversation", description: "영어 회화 능력 향상", sort: "A", assignedClass: "1학년 B반", categoryKey: "afterSchool" },
  { classRoomId: "CR006", name: "History of Art", description: "세계 미술사 이해", sort: "A", assignedClass: "3학년 A반", categoryKey: "sort" },
  { classRoomId: "CR007", name: "Computer Programming", description: "기초 코딩과 문제 해결 능력 향상", sort: "A", assignedClass: "2학년 C반", categoryKey: "professional" },
  { classRoomId: "CR008", name: "Music Ensemble", description: "합주를 통한 음악적 감각 개발", sort: "A", assignedClass: "1학년 C반", categoryKey: "afterSchool" },
  { classRoomId: "CR009", name: "Physical Education", description: "체력 향상과 스포츠 활동", sort: "A", assignedClass: "3학년 B반", categoryKey: "sort" },
  { classRoomId: "CR010", name: "Robotics Workshop", description: "로봇 제작과 프로그래밍 실습", sort: "A", assignedClass: "2학년 B반", categoryKey: "professional" },
  { classRoomId: "CR011", name: "Drama Club", description: "연극 활동을 통한 표현력 향상", sort: "A", assignedClass: "1학년 A반", categoryKey: "afterSchool" }
];

export const useMyClass = () => {
  const [myClasses, setMyClasses] = useState<MyClassData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'sort' | 'professional' | 'afterSchool' | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMyClasses(dummyClasses);
      setError(null);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // categoryFilter가 설정되어 있으면 해당 카테고리만 반환
  const filteredClasses = categoryFilter
    ? myClasses.filter(c => c.categoryKey === categoryFilter)
    : myClasses;

  return { myClasses: filteredClasses, error, setCategoryFilter };
};