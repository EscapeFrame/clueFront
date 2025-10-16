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
    subjectType: string[];
}

export const LINK_CATEGORY_MAP = {
  Total: '전체',
  General: '인문과목',
  Professional: '전공과목',
  AfterSchool: '방과후',
} as const;

export type LinkCategory = keyof typeof LINK_CATEGORY_MAP;
export type LinkCategoryKorean = typeof LINK_CATEGORY_MAP[LinkCategory];

export const LINK_CATEGORY_ENGLISH_MAP: { [key in LinkCategoryKorean]?: LinkCategory } = {
  '전체': 'Total',
  '인문과목': 'General',
  '전공과목': 'Professional',
  '방과후': 'AfterSchool',
};
