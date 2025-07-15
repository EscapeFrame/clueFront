export interface TPost {
  classRoomId: string;
  name: string;
  sort: string;
  target: string;
  studentCount: number;
  isActivation: number; // 또는 boolean으로 바꿔도 됩니다
}

export const TPosts: TPost[] = [
  {
    classRoomId: '1234',
    name: "자바를 자바라!",
    sort: "Java",
    target: "2-1",
    studentCount: 13,
    isActivation: 1,
  },
  {
    classRoomId: '5678',
    name: "자바를 잡지마라!",
    sort: "Java",
    target: "2-2",
    studentCount: 14,
    isActivation: 2,
  },
  {
    classRoomId: '91011',
    name: "Java를 자바라!",
    sort: "Java",
    target: "2-3",
    studentCount: 15,
    isActivation: 1,
  },
  {
    classRoomId: '1213',
    name: "do not Java!",
    sort: "Java",
    target: "2-4",
    studentCount: 16,
    isActivation: 3,
  },
  {
    classRoomId: '1415',
    name: "doot Java!",
    sort: "Java",
    target: "2-4",
    studentCount: 16,
    isActivation: 1,
  },
];

export default TPosts;