export interface LinkCard {
  id: string; 
  date: string;
  title: string;
  description: string;
  subjectType: string[]; 
  link: string; // URL 필드 추가
}

// 폼에서 관리할 데이터 구조
export interface LinkFormData {
    title: string;
    url: string;
    explanation: string;
    tags: string[];
}

export type LinkCategory = '전체' | '인문과목' | '전공과목' | '방과후';