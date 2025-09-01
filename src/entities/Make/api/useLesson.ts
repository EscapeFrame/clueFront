import Customapi from "@/shared/config/api";
import { DirectoryCreateRequest, DirectoryUpdateRequest } from '@/shared/types/Class/directory';

export interface Directory {
  id: number;
  classRoomId: number;
  directoryOrder: number;
  name: string;
}

// 디렉토리 목록 조회
export const fetchDirectories = async (classRoomId: number): Promise<Directory[]> => {
  const res = await Customapi.get(`/api/class/${classRoomId}`);
  return res.data;
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