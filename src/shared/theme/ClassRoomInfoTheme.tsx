export interface Post {
  classRoomId: string;
  name: string;
  description: string;
  teacherName: string;
  maxProgress: number;
  progress: number;
}

export const Posts: Post[] = [
  {
    classRoomId: "1234",
    name: "자바를 자바라!",
    description: "즐거운 자바수업을 하고 자바를 마스터하며 더 나아가 프레임워크까지 다루어 보아요!",
    teacherName: "유근찬",
    maxProgress: 6,
    progress: 2,
  },
  {
    classRoomId: "5678",
    name: "자바를 잡지마라!",
    description: "즐거운 자바수업을 하고 더 나아가 프레임워크까지 다루어 보아요!",
    teacherName: "김민재",
    maxProgress: 8,
    progress: 2,
  },
  {
    classRoomId: "91011",
    name: "Java를 자바라!",
    description: "자바를 마스터하며 더 나아가 프레임워크까지 다루어 보아요!",
    teacherName: "김한결",
    maxProgress: 6,
    progress: 2,
  },
  {
    classRoomId: "1213",
    name: "do not Java!",
    description: "즐거운 자바수업을 하고 더 나아가 프레임워크까지 다루어 보아요!",
    teacherName: "공덕현",
    maxProgress: 6,
    progress: 2,
  },
  {
    classRoomId: "1415",
    name: "doot Java!",
    description: "프레임워크까지 다루어 보아요!",
    teacherName: "안재민",
    maxProgress: 2,
    progress: 2,
  },
];

export default Posts;