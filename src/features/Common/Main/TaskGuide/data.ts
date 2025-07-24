export interface Post {
    title: string;      // 과목/과제 이름
    dueDate: string;    // 마감일 (YYYY-MM-DD)
    body: string;       // 본문
    link: string;       // 제출 링크
    available: boolean; // 링크 연결 여부
}

export const Posts: Post[] = [
  {
    title: "국어 수행평가",
    dueDate: "2025-07-21",
    body: "문학 작품에 대한 감상문을 작성하여 제출하세요.",
    link: "/submit/korean",
    available: true,
  },
  {
    title: "수학 수행평가",
    dueDate: "2025-07-22",
    body: "수열 단원에 대한 문제 해결 과정 보고서 제출.",
    link: "/submit/math",
    available: true,
  },
  {
    title: "영어 수행평가",
    dueDate: "2025-07-23",
    body: "자신의 꿈에 대해 영어 에세이를 작성하세요.",
    link: "/submit/english",
    available: true,
  },
  {
    title: "과학 수행평가",
    dueDate: "2025-07-24",
    body: "실험 결과를 분석하고 그래프로 표현하세요.",
    link: "/submit/science",
    available: true,
  },
  {
    title: "역사 수행평가",
    dueDate: "2025-07-25",
    body: "조선시대의 사회 구조에 대해 PPT 제작 후 제출.",
    link: "/submit/history",
    available: true,
  },
  {
    title: "기술 수행평가",
    dueDate: "2025-07-26",
    body: "가정 내 전기 사용량 조사 리포트 제출.",
    link: "/submit/tech",
    available: true,
  },
  {
    title: "미술 수행평가",
    dueDate: "2025-07-27",
    body: "주어진 주제로 창의적인 그림을 그려 제출하세요.",
    link: "/submit/art",
    available: true,
  },
  {
    title: "체육 수행평가",
    dueDate: "2025-07-28",
    body: "개인 체력 기록표와 운동 계획서 작성.",
    link: "/submit/pe",
    available: true,
  },
  {
    title: "음악 수행평가",
    dueDate: "2025-07-29",
    body: "자신이 좋아하는 음악을 소개하는 감상문 제출.",
    link: "/submit/music",
    available: true,
  },
  {
    title: "정보 수행평가",
    dueDate: "2025-07-30",
    body: "자바스크립트 기반 인터랙티브 웹페이지 개발 과제.",
    link: "/submit/coding",
    available: true,
  },
  {
    title: "도덕 수행평가",
    dueDate: "2025-08-01",
    body: "가치 있는 삶에 대한 나의 생각 발표 자료 제출.",
    link: "/submit/ethics",
    available: true,
  },
  {
    title: "진로 수행평가",
    dueDate: "2025-08-02",
    body: "희망 직업 조사 후 진로 탐색 보고서 작성.",
    link: "/submit/career",
    available: true,
  },
];