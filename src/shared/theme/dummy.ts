import { Assignment, AssignmentFileType, DetailAssignmentData, DetailAssignmentStudent, StudentAssignmentResponse, TeacherSubmissionCheckResponse } from '@/shared/types/Class/Assignment/Attachment';

// -------------------- 클래스 정보 더미 --------------------
export const dummyClassInfo = {
  classroomId: "11",
  name: "프론트엔드 개발 기초",
  sort: "정보",
  description: "리액트와 타입스크립트를 이용한 프론트엔드 입문 수업",
  target: "3학년 1반",
  isActivation: true,
  createdAt: "2025-09-20T09:00:00",
  teacherName: "홍길동",
  progress: 30,
  maxProgress: 100,
  imageUrl: "/public/Paletto/Haeyul.png"
};

// -------------------- 과제 더미 --------------------
export const dummyAssignments: Assignment[] = [
  {
    id: 1,
    title: "수학 숙제 1",
    content: "문제 1~10 풀기",
    description: "각 문제를 PDF로 제출",
    deadline: "2025-09-30",
    duringDate: "2025-09-20",
    endDate: "2025-09-30",
    remainingTime: "10일",
    isSubmitted: false,
    submissionDate: null,
    files: [
      { fileId: "f1", fileName: "homework1.pdf", fileSize: 1.2 },
    ],
  },
  {
    id: 2,
    title: "영어 숙제 1",
    content: "영단어 암기",
    description: "암기한 내용을 사진으로 제출",
    deadline: "2025-10-05",
    duringDate: "2025-09-25",
    endDate: "2025-10-05",
    remainingTime: "15일",
    isSubmitted: true,
    submissionDate: "2025-09-21",
    files: [
      { fileId: "f2", fileName: "vocabulary.jpg", fileSize: 0.8 },
    ],
  },
];

// -------------------- DetailAssignments Props 더미 --------------------
export const dummyAssignment: Assignment & { submittedCount: number; totalCount: number } = {
  id: "1",
  title: "샘플 과제 제목",
  content: "학생들이 해야 할 주요 내용",
  description: "과제 상세 설명입니다. 학생들이 제출해야 하는 내용과 주의 사항을 여기에 작성합니다.",
  deadline: "2025-09-30",
  endDate: "2025-09-30",
  isSubmitted: false,
  submissionDate: null,
  files: ["sample.pdf"], // 여러 파일도 가능
  submittedCount: 15, // 제출 완료 학생 수
  totalCount: 20, // 총 학생 수
};

// -------------------- 학생 과제 제출 상태 더미 --------------------
export const dummyStudentAssignments: StudentAssignmentResponse[] = [
  {
    files: [],
    isSubmitted: null,
    studentNumber: "2025001",
    submittedAt: null,
    userName: "홍길동",
  },
  {
    files: [],
    isSubmitted: "2025-09-21",
    studentNumber: "2025002",
    submittedAt: "2025-09-21",
    userName: "김철수",
  },
];

// -------------------- 선생님용 제출 확인 더미 --------------------
export const dummyTeacherSubmissionCheck: TeacherSubmissionCheckResponse = {
  student: [
    { classNumberGrade: 1, contentId: 1, isSubmitted: true, userName: "홍길동" },
    { classNumberGrade: 2, contentId: 1, isSubmitted: false, userName: "김철수" },
  ],
};

// -------------------- 과제 첨부 파일 더미 --------------------
export const dummyFiles: AssignmentFileType[] = [
  { fileId: "f1", fileName: "homework1.pdf", fileSize: 1.2 },
  { fileId: "f2", fileName: "vocabulary.jpg", fileSize: 0.8 },
];

// -------------------- DetailAssignment 데이터 더미 --------------------
export const dummyDetailAssignmentData: Record<string, DetailAssignmentData> = {
  "1": {
    student: [
      { 
        userName: "홍길동", 
        classNumberGrade: 1101,
        isSubmitted: true, 
        contentId: "1",
        userImg: "/public/avatars/hong.png",
        userSubmitDate: "2025-09-19"
      },
      { 
        userName: "김철수", 
        classNumberGrade: 1102,
        isSubmitted: false, 
        contentId: "1",
        userImg: "/public/avatars/kim.png",
        userSubmitDate: null
      },
      { 
        userName: "박영희", 
        classNumberGrade: 1201,
        isSubmitted: false, 
        contentId: "1",
        userImg: null,
        userSubmitDate: null
      },
      { 
        userName: "이민수", 
        classNumberGrade: 2101,
        isSubmitted: true, 
        contentId: "2",
        userImg: "/public/avatars/lee.png",
        userSubmitDate: "2025-09-20"
      },
      { 
        userName: "최지우", 
        classNumberGrade: 2102,
        isSubmitted: false, 
        contentId: "2",
        userImg: "/public/avatars/choi.png",
        userSubmitDate: null
      },
      { 
        userName: "정다은", 
        classNumberGrade: 2201,
        isSubmitted: true, 
        contentId: "2",
        userImg: null,
        userSubmitDate: "2025-09-21"
      },
      { 
        userName: "김민재", 
        classNumberGrade: 3101,
        isSubmitted: false, 
        contentId: "3",
        userImg: "/public/avatars/kim2.png",
        userSubmitDate: null
      },
    ],
  },
};
