export interface AssignmentFileType {
    fileId: number;         // 파일 ID
    fileName: string;       // 원본 파일 이름
    fileSize: number;       // 파일 크기 (MB 단위)
  }
  
  // 과제 타입
  export interface AssignmentType {    // 과제 ID
    assignmentId: number;
    title: string;              // 과제 제목  
    startDate: string;
    endDate: string;            // 마감일 (ISO-8601 권장)
    duringDate: string;         // 남은 기간 (DDHH)
    files: AssignmentFileType[];    // 첨부 파일 리스트
  }

export interface AssignmentFile {
  fileId: number
  fileName: string
  fileSize: number
}

export interface FileInfoType {
  id: string
  name: string
  size: string
}