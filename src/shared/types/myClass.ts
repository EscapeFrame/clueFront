export interface ClassItem {
  id: number;
  name: string;
  description?: string;
  [key: string]: any;
}

export interface MyClassReturn {
  myClasses: ClassItem[];
  loading: boolean;
  error: string | null;
  joinClassroom: (code: string) => Promise<boolean>;
  searchClasses: (query: string) => Promise<void>;
  createClassroom: (name: string, description?: string) => Promise<boolean>;
  deleteClassroom: (classId: string | number) => Promise<boolean>;
  refetch: () => Promise<void>;
}