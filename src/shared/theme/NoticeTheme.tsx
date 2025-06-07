export interface NoticeItem {
    id: number;
    title: string;
    date: string;   // YYYY-MM-DD 형식 등
    description?: string;
  }
  
  export const Notices: NoticeItem[] = [
    {
      id: 1,
      title: '자바 수업 시작 안내',
      date: '2025-05-25',
      description: '자바 수업이 5월 25일부터 시작됩니다. 준비물 확인해주세요.',
    },
    {
      id: 2,
      title: '중간 점검 테스트 예정',
      date: '2025-06-01',
      description: '중간 점검 테스트가 예정되어 있습니다. 복습을 철저히 해주세요.',
    },
    {
      id: 3,
      title: '중간 점검 테스트 예정',
      date: '2025-06-01',
      description: '중간 점검 테스트가 예정되어 있습니다. 복습을 철저히 해주세요.',
    },
    {
      id: 4,
      title: '중간 점검 테스트 예정',
      date: '2025-06-01',
      description: '중간 점검 테스트가 예정되어 있습니다. 복습을 철저히 해주세요.',
    },
];  