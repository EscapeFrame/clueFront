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
  homeworkId: string;
  people: number;
  description?: string;  // 설명 필드 추가
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
        homeworkId: "lesson01",
        people: 16,
        description: `이번 과제는 자바 프로그래밍 언어의 역사, 특징, 주요 개념을 조사하는 것입니다. 
조사한 내용을 정리하여 5페이지 분량의 리포트를 제출해주세요. 
참고자료로는 공식 문서와 신뢰할 만한 웹사이트를 사용하세요.`
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
        homeworkId: "lesson02",
        people: 16,
        description: `이 과제는 자바의 주요 라이브러리 및 프레임워크에 대해 조사하는 내용입니다. 
특히 Spring, Hibernate, Maven 등의 특징과 사용법을 중심으로 조사해주세요. 
작성한 내용은 발표 자료로도 활용될 예정입니다.`
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
        homeworkId: "lesson03",
        people: 13,
        description: `객체지향 프로그래밍(OOP)의 기본 개념을 자바로 구현하는 방법에 대해 조사하세요. 
클래스, 객체, 상속, 다형성, 캡슐화 등을 포함하여 예제 코드를 작성해 제출합니다.`
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
        homeworkId: "lesson04",
        people: 14,
        description: `자바의 예외 처리 메커니즘에 대해 조사하고, try-catch-finally 문법을 활용한 예제 코드를 작성하세요. 
예외의 종류와 사용자 정의 예외에 대해서도 설명해주세요.`
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
        homeworkId: "lesson05",
        people: 15,
        description: `자바에서 멀티스레딩의 개념과 활용법을 조사하세요. 
스레드 생성 방법과 동기화 문제 해결 방안에 대해 구체적으로 작성합니다. 
실제 적용 사례도 함께 정리해 주세요.`
      }
    ],
  },
];
