// 디렉토리 항목
export interface DirectoryItem {
  id: number;
  name: string;             // 디렉토리 이름
  directoryOrder: number;   // 디렉토리 순서
  url?: string;             // 해당 디렉토리 링크
  isRead: boolean;          // 읽음 여부
}

// 디렉토리 묶음
export interface DirectorySection {
  classRoomId: string;         // 교실 ID
  title: string;               // 교실 이름 또는 그룹명
  items: DirectoryItem[];      // 디렉토리 리스트
  isExpanded?: boolean;        // UI 제어용
}

// 예시 데이터
export const Directories: DirectorySection[] = [
  {
    classRoomId: "1",
    title: "자바를 자바라!",
    items: [
      { id: 1, name: "1차시 오리엔테이션", directoryOrder: 1, url: "/lesson/java-intro", isRead: true },
      { id: 2, name: "2차시 변수와 자료형", directoryOrder: 2, url: "/lesson/java-variables", isRead: false }
    ],
  },
  {
    classRoomId: "2",
    title: "스프링 부트 캠프",
    items: [
      { id: 3, name: "1차시 스프링 시작", directoryOrder: 1, url: "/lesson/spring-intro", isRead: false },
      { id: 4, name: "2차시 컨트롤러", directoryOrder: 2, url: "/lesson/spring-controller", isRead: false }
    ],
  }
];