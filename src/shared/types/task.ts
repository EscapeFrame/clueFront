export interface PendingTaskItem {
    title: string;      // 과목/과제 이름
    dueDate: string;    // 마감일 (YYYY-MM-DD)
    body: string;       // 본문
    link: string;       // 제출 링크
    available: boolean; // 링크 연결 여부
}