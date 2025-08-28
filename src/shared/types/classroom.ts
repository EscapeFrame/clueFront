export interface ClassInfoProps {
  classroomId: string;  // 강의실 ID 추가
  name: string;
  sort: string;
  description: string;
  target: string;
  teacherName: string;
  progress: number;
  maxProgress: number;
  imageUrl: string;
}

// ClassCard
export interface ClassPost {
  classRoomId: string;     // 강의실 ID
  name: string;            // 수업 타이틀
  sort: string;            // 과목 이름
  target: string;          // 담당 반
  teacherName: string;     // 담당 교사 이름
  description: string;     // 수업 설명
}

// Lesson 
export interface Directory {
  id: string;
  name: string;
  isRead: boolean;
  subDirectories?: Directory[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface QuestionItem {
  id: string;
  title: string;
  content: string;
  author?: string;
  date: string;
}

export interface LessonProps {
  classId: string;
}

// Assignment
export interface Assignment {
  duringDate: string;
  endDate: string;
  id: string;
  title: string;
  deadline: string;
  remainingTime: string;
  isSubmitted: boolean;
  description: string;
  submissionDate?: string;
  files?: string[];
  uploadedFiles?: string[]; // 제출 전 업로드된 임시 파일

}

export interface AssignmentProps {
  classRoomId: string;
}

export interface AssignmentCardProps {
  data: Assignment;
  updateAssignment: (id: string, changes: Partial<Assignment>) => void;
}

export interface AssignmentFileType {
  fileId: number;         // 파일 ID
  fileName: string;       // 원본 파일 이름
  fileSize: number;       // 파일 크기 (MB 단위)
  assignmentId: number;
  title: string;              // 과제 제목  
  startDate: string;
  endDate: string;            // 마감일
  duringDate: string;         // 남은 기간 (DDHH)
  files: AssignmentFileType[];    // 첨부 파일 리스트
}

// Exam
export interface Exam {
  id: string;
  title: string;
  date: string;
}

export interface BasicInfoData {
  id?: string;
  subjectCategory: string;
  period: string;
  grade: string;
  classNum: string;
  roomName: string;
  description: string;
};

export interface BasicInfoProps {
  data: BasicInfoData;
  setData: React.Dispatch<React.SetStateAction<BasicInfoData>>;
};