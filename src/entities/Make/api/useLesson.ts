import Customapi from "@/shared/config/api";
import { DirectoryCreateRequest, DirectoryUpdateRequest } from '@/shared/types/Class/directory';


export interface Directory {
  id: number;
  classRoomId: string;
  directoryOrder: number;
  name: string;
}

interface DirectoryApiResponse {
  directoryList: Array<{
    directoryId: number;
    directoryName: string;
  }>;
}

// 디렉토리 목록 조회
export const fetchDirectories = async (classRoomId: string): Promise<Directory[]> => {
  const res = await Customapi.get(`/api/class/${classRoomId}/all`);
  
  if (res.status !== 200 || !res.data) {
    console.error(`수업 디렉토리 조회 실패: ${res.status}`);
    return [{
      id: 0,
      name: '디렉토리가 비었습니다.',
      classRoomId: classRoomId,
      directoryOrder: 0,
    }];
  }

  const { directoryList } = res.data as DirectoryApiResponse;

  // ✅ directoryList를 Directory[]로 변환
  const convertedList: Directory[] = directoryList.map((d, index) => ({
    id: d.directoryId,
    name: d.directoryName,
    classRoomId: classRoomId,
    directoryOrder: index + 1, // 정렬 순서가 없다면 index로 대체
  }));

  return convertedList;
};

// 디렉토리 생성
export const createDirectory = async (request: DirectoryCreateRequest): Promise<Directory> => {
  const res = await Customapi.post(`/api/directory`, request);
  return res.data;
};

// 디렉토리 수정
export const updateDirectory = async ( request: DirectoryUpdateRequest): Promise<Directory> => {
  const res = await Customapi.patch(`/api/directory`, request);
  return res.data;
};