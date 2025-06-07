export interface AssignmentData {
  id: number;
  title: string;
  status: '미제출' | '제출됨';
  statusColor: string;
  deadline: string;
  timeLeft: string;
  timeLeftColor: string;
  fileName?: string;
  fileSize?: string;
  hasFile: boolean;
  buttonText: string;
  buttonType: 'submit' | 'resubmit';
  classId: string;
  lessonId: string;
}

export interface AssignmentGroup {
  cards: AssignmentData[];
}

export const dummyDataGroups: AssignmentGroup[] = [
  {
    cards: [
      {
        id: 1,
        title: "자바에 대해서 조사하기",
        status: "미제출",
        statusColor: "bg-blue-500",
        deadline: "2025.04.15 23:59:59",
        timeLeft: "1일 5시간 남음",
        timeLeftColor: "text-blue-500",
        fileName: "2202공덕.pdf",
        fileSize: "15.0 KB",
        hasFile: true,
        buttonText: "과제 제출하기",
        buttonType: "submit",
        classId: "class01",
        lessonId: "lesson01"
      },
      {
        id: 2,
        title: "자바에 대해서 조사하기",
        status: "제출됨",
        statusColor: "bg-gray-500",
        deadline: "2025.04.15 23:59:59",
        timeLeft: "1일 5시간 남음",
        timeLeftColor: "text-blue-500",
        fileName: "2202덕켠.pdf",
        fileSize: "15.0 KB",
        hasFile: true,
        buttonText: "다시 제출하기",
        buttonType: "resubmit",
        classId: "class01",
        lessonId: "lesson01"
      },
      {
        id: 3,
        title: "자바에 대해서 조사하기",
        status: "미제출",
        statusColor: "bg-blue-500",
        deadline: "2025.04.15 23:59:59",
        timeLeft: "1일 5시간 남음",
        timeLeftColor: "text-blue-500",
        hasFile: false,
        buttonText: "과제 제출하기",
        buttonType: "submit",
        classId: "class01",
        lessonId: "lesson01"
      },
      {
        id: 4,
        title: "자바에 대해서 조사하기",
        status: "미제출",
        statusColor: "bg-blue-500",
        deadline: "2025.04.15 23:59:59",
        timeLeft: "1일 5시간 남음",
        timeLeftColor: "text-blue-500",
        hasFile: false,
        buttonText: "과제 제출하기",
        buttonType: "submit",
        classId: "class01",
        lessonId: "lesson01"
      },
      {
        id: 5,
        title: "자바에 대해서 조사하기",
        status: "제출됨",
        statusColor: "bg-gray-500",
        deadline: "2025.04.15 23:59:59",
        timeLeft: "1일 5시간 남음",
        timeLeftColor: "text-blue-500",
        fileName: "2201콩덕콩덕.pdf",
        fileSize: "15.0 KB",
        hasFile: true,
        buttonText: "다시 제출하기",
        buttonType: "resubmit",
        classId: "class01",
        lessonId: "lesson01"
      }
    ],
  },
];