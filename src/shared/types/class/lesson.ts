export interface Directory {
  classRoomId: number;
  directoryOrder: number;
  name: string;
  [property: string]: any;
}

export interface DirectoryCreateRequest {
  classRoomId: number;
  name: string;
  directoryOrder: number;
  [property: string]: any;
}

export interface DirectoryUpdateRequest {
  name?: string;
  directoryOrder?: number;
  isRead?: boolean;
  [property: string]: any;
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