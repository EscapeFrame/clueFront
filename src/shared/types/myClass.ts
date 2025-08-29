interface ClassItem {
  id: number;
  name: string;
  description?: string;
  [key: string]: any;
}

interface MyClassReturn {
  myClasses: ClassItem[];
  loading: boolean;
  error: string | null;
  joinClassroom: (code: string) => Promise<boolean>;
  searchClasses: (query: string) => Promise<void>;
  refetch: () => Promise<void>;
}