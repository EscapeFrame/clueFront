export interface Post {
  classRoomId: string;
  name: string;
  description: string;
  sort: string;
  target: string;
  studentCount: number;
  isActivation: boolean;
  createdAt: Date;
  category: number; 
}

export const Posts: Post[] = [
  {
    classRoomId: "1234",
    name: "자바를 자바라!",
    description: "자바의 기본 문법과 객체지향 개념을 익힙니다.",
    sort: "Java",
    target: "2-1",
    studentCount: 13,
    isActivation: true,
    createdAt: new Date("2025-07-31"),
    category: 0,
  },
  {
    classRoomId: "5678",
    name: "자바를 잡지마라!",
    description: "자바 중급 과정으로 실전 프로젝트를 진행합니다.",
    sort: "Java",
    target: "2-2",
    studentCount: 14,
    isActivation: true,
    createdAt: new Date("2025-06-30"), // 6월은 30일까지
    category: 1,
  },
  {
    classRoomId: "91011",
    name: "Java를 자바라!",
    description: "자바 초급자를 위한 친절한 입문 강의입니다.",
    sort: "Java",
    target: "2-3",
    studentCount: 15,
    isActivation: true,
    createdAt: new Date("2025-07-14"),
    category: 2,
  },
  {
    classRoomId: "1213",
    name: "do not Java!",
    description: "자바를 쓰지 않는 개발 방식에 대해 탐구합니다.",
    sort: "Java",
    target: "2-4",
    studentCount: 16,
    isActivation: false,
    createdAt: new Date("2025-12-31"),
    category: 1,
  },
  {
    classRoomId: "1415",
    name: "doot Java!",
    description: "자바를 더 깊이 있게 다루는 고급 과정입니다.",
    sort: "Java",
    target: "2-4",
    studentCount: 16,
    isActivation: false,
    createdAt: new Date("2025-10-31"),
    category: 2,
  },
];

export default Posts;