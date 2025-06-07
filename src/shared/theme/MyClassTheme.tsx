export interface Post {
    classId: string;
    title: string;
    subject: string;
    classRoom: string;
    people: number;
    category: number;
  }
  
  export const Posts: Post[] = [
      {
        classId: '1234',
        title: "자바를 자바라!",
        subject: "Java",
        classRoom: "2-1",
        people: 13,
        category: 1,
      },
      {
        classId: '5678',
          title: "자바를 잡지마라!",
          subject: "Java",
          classRoom: "2-2",
          people: 14,
          category: 2,
        },
        {
          classId: '91011',
          title: "Java를 자바라!",
          subject: "Java",
          classRoom: "2-3",
          people: 15,
          category: 1,
        },
        {
          classId: '1213',
            title: "do not Java!",
            subject: "Java",
            classRoom: "2-4",
            people: 16,
            category: 3,
          },
          {
            classId: '1415',
              title: "doot Java!",
              subject: "Java",
              classRoom: "2-4",
              people: 16,
              category: 1,
            }
    ];
  
    export default Posts;