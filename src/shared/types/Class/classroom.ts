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

// 수업조회
export interface ClassResponse {
    classRoomId: number; // 수업 아이디
    classRoomName: string; // 수업 이름
    description: string; // 수업 설명
    directoryList: string[]; // 디렉토리 리스트
    teacherNames: string[]; // 선생님 리스트
    [property: string]: any;
}

// 교실생성(선생님)
export interface ClassCreateRequest {
    description: string;
    isActivation: boolean;
    name: string;
    sort: string;
    target: string;
    [property: string]: any;
}

// 교실 정보 수정(선생님)
export interface ClassUpdateRequest {
    description: string;
    isActivation: boolean;
    name: string;
    sort: string;
    target: string;
    [property: string]: any;
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
