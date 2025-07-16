// 첨부 파일 타입
export interface AssignmentFile {
  fileId: number;         // 파일 ID
  fileName: string;       // 원본 파일 이름
  fileSize: number;       // 파일 크기 (MB 단위)
}

// 과제 타입
export interface Assignment {    // 과제 ID
  assignmentId: number;
  title: string;              // 과제 제목  
  startDate: string;
  endDate: string;            // 마감일 (ISO-8601 권장)
  duringDate: string;         // 남은 기간 (DDHH)
  files: AssignmentFile[];    // 첨부 파일 리스트
}

export const cardThemeDummy = [
  {
    assignmentId : 1,
    title: "자바에 대해서 조사하기",
    startDate: "2025.03.15 21:00:00",
    endDate: "2025.04.15 23:59:59",
    duringDate: "1일 5시간 남음",
    files: [
      {
        fileName: "2202공덕.pdf",
        fileSize: 15.0,
        fileId: 101
      }
    ]
  },
  {
    assignmentId : 2,
    title: "파이썬 데이터 분석 과제",
    startDate: "2025.04.01 09:00:00",
    endDate: "2025.04.10 23:59:59",
    duringDate: "3일 2시간 남음",
    files: [
      {
        fileName: "파이썬과제_홍길동.pdf",
        fileSize: 20.0,
        fileId: 102
      }
    ]
  },
  {
    assignmentId : 3,
    title: "웹 프로그래밍 실습",
    startDate: "2025.04.05 10:00:00",
    endDate: "2025.04.20 23:59:59",
    duringDate: "5일 8시간 남음",
    files: [
      {
        fileName: "웹실습_이영희.pdf",
        fileSize: 18.5,
        fileId: 103
      }
    ]
  },
  {
    assignmentId : 4,
    title: "알고리즘 문제 풀이",
    startDate: "2025.04.10 08:00:00",
    endDate: "2025.04.25 23:59:59",
    duringDate: "10일 4시간 남음",
    files: [
      {
        fileName: "알고리즘_김철수.pdf",
        fileSize: 22.0,
        fileId: 104
      }
    ]
  },
  {
    assignmentId : 5,
    title: "네트워크 기초 과제",
    startDate: "2025.04.12 13:00:00",
    endDate: "2025.04.22 23:59:59",
    duringDate: "7일 6시간 남음",
    files: []
  }
];

export default cardThemeDummy;