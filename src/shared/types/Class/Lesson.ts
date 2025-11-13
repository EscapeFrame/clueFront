export interface Directory {
  id: string;
  name: string;
  isRead: boolean;
  directoryList?: SubDirectory[];
  readCount?: number;
  totalCount?: number;
}

export type SubDirectory = {
  id: string;
  name: string;
  isRead: boolean;
  type: 'markdown' | 'ppt' | 'code' | 'docs';
};

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface QuestionItem {
  id: string;
  title: string;
  content: string;
  author?: string;
  date: string;
}

export interface LessonProps {
  classRoomId: string;
  code: string;
}