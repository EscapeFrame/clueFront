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