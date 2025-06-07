interface Posts {
    classId: string,
    title: string,
    description: string,
    teacherId: string,
    maxProgress: number,
    progress: number,
};

export const Posts = [
    {
      classId: "1234",
      title: "자바를 자바라!",
      description: "즐거운 자바수업을 하고 자바를 마스터하며 더 나아가 프레임워크까지 다루어 보아요!",
      teacherId: "유근찬",
      maxProgress: 6,
      progress: 2,
    },
    {
      classId: "5678",
        title: "자바를 잡지마라!",
        description: "즐거운 자바수업을 하고 더 나아가 프레임워크까지 다루어 보아요!",
        teacherId: "김민재",
        maxProgress: 8,
        progress: 2,
      },
      {
        classId: "91011",
        title: "Java를 자바라!",
        description: "자바를 마스터하며 더 나아가 프레임워크까지 다루어 보아요!",
        teacherId: "김한결",
        maxProgress: 6,
        progress: 2,
      },
      {
        classId: "1213",
        title: "do not Java!",
        description: "즐거운 자바수업을 하고 더 나아가 프레임워크까지 다루어 보아요!",
        teacherId: "공덕현",
        maxProgress: 6,
        progress: 2,
    },
    {
      classId: "1415",
        title: "doot Java!",
        description: "프레임워크까지 다루어 보아요!",
        teacherId: "안재민",
        maxProgress: 2,
        progress: 2,
    }
  ];

  export default Posts;