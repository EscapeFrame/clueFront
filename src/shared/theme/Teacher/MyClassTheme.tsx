export interface TPost {
    classId: string;
    title: string;
    subject: string;
    classRoom: string;
    people: number;
    status: number;
  }
  
  export const TPosts: TPost[] = [
      {
        classId: '1234',
        title: "자바를 자바라!",
        subject: "Java",
        classRoom: "2-1",
        people: 13,
        status: 1,
      },
      {
        classId: '5678',
          title: "자바를 잡지마라!",
          subject: "Java",
          classRoom: "2-2",
          people: 14,
          status: 2,
        },
        {
          classId: '91011',
          title: "Java를 자바라!",
          subject: "Java",
          classRoom: "2-3",
          people: 15,
          status: 1,
        },
        {
          classId: '1213',
            title: "do not Java!",
            subject: "Java",
            classRoom: "2-4",
            people: 16,
            status: 3,
          },
          {
            classId: '1415',
              title: "doot Java!",
              subject: "Java",
              classRoom: "2-4",
              people: 16,
              status: 1,
            }
    ];
  
    export default TPosts;