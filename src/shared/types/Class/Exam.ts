export interface Exam {
  status: 0 | 1;
  id: string;
  title: string;
  date: string;
}

export interface ExamDetail extends Exam {
  description?: string;      // 시험 상세 설명
  files?: ExamFile[];        // 할당 파일 목록
}

export interface ExamFile {
  fileName: string;
  fileSize: any;
  id: string;
  name: string;
  url?: string;
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