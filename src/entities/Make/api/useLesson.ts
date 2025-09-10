import Customapi from "@/shared/config/api";
import { DirectoryCreateRequest, DirectoryUpdateRequest } from '@/shared/types/Class/directory';

export interface Directory {
  id: number;
  classRoomId: string;
  directoryOrder: number;
  name: string;
}

// 디렉토리 목록 조회
export const fetchDirectories = async (classRoomId: string): Promise<Directory[]> => {
  const res = await Customapi.get(`/api/class/${classRoomId}/all`);
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

// 디렉토리 삭제
export const deleteDirectory = async (dirId: string): Promise<Directory> => {
  const res = await Customapi.delete(`/api/directory/${dirId}`);
  return res.data;
};