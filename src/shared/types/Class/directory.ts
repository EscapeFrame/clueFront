// 디렉토리 생성
export interface DirectoryCreateRequest {
    classRoomId: number;
    directoryOrder: number;
    name: string;
    [property: string]: any;
}

// 디렉토리 수정
export interface DirectoryUpdateRequest {
    classRoomId: number;
    directoryId: number;
    directoryOrder: number;
    name: string;
    [property: string]: any;
}