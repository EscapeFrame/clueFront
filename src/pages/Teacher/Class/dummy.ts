import { Directory, NewsItem, QuestionItem } from '@/shared/types/Class/Lesson';

export const dummyDirectories: Directory[] = [
  {
      id: 'dir1',
      name: '디렉토리 1',
      isRead: true,
      directoryList: [
          { id: 'doc1', name: '문서 1', isRead: false, type: 'markdown' },
          { id: 'doc2', name: '문서 2', isRead: true, type: 'ppt' },
      ],
      readCount: 1, // 읽은 문서 수
      totalCount: 2,
  },
  {
      id: 'dir2',
      name: '디렉토리 2',
      isRead: true,
      directoryList: [
          { id: 'doc3', name: '문서 3', isRead: true, type: 'code' },
      ],
      readCount: 1,
      totalCount: 1,
  },
];

export const dummyClassCode = "12345";