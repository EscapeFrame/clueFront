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