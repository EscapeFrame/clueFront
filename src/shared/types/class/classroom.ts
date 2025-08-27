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

// 학습실 설정 (수업 만들기 폼)
export interface ClassroomSetupData {
  isActivated: boolean;
  isChatEnabled: boolean;
}