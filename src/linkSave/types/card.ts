export interface LinkCard {
  id: string; 
  date: string; 
  title: string;
  explanation: string;
  tags: string[]; 
  url: string; // URL 필드 추가
}

// 폼에서 관리할 데이터 구조
export interface LinkFormData {
    title: string;
    url: string;
    explanation: string;
    tags: string[];
}
export type LinkCategory = '전체' | '반' | '인문과목' | '전공과목' | '방과후';