export interface Directory {
  id: string;
  name: string;
  isRead: boolean;
  subDirectories?: Directory[];
}

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
}