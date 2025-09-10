// 디렉토리 생성
export interface DirectoryCreateRequest {
    classRoomId: string;
    directoryOrder: number;
    name: string;
}

// 디렉토리 수정
export interface DirectoryUpdateRequest {
    classRoomId: string;
    directoryId: number;
    directoryOrder: number;
    name: string;
}