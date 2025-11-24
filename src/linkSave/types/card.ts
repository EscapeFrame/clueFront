export interface LinkCard {
  id: number; // API returns numeric id
  grade?: string; // 학년 (API uses string)
  clas?: string; // 반 (API spells it as `clas` and uses string)
  title: string;
  description: string;
  link: string; // URL
  authorizationType?: AuthorizationType;
  subjectType: string | string[]; // API may provide a single subjectType like "General" or array
  date?: string; // optional, kept for backward compatibility
}

// 폼에서 관리할 데이터 구조
export interface LinkFormData {
    title: string;
    link: string;
    description: string;
  subjectType: string;
  authorizationType?: AuthorizationType;
  grade?: string;
  clas?: string;
}

// 공개 범위 타입: 공개, 비공개, 자신의 반
export type AuthorizationType = 'PUBLIC' | 'PRIVATE' | 'CLASS_ONLY';

export const LINK_CATEGORY_MAP = {
  Total: '전체',
  General: '인문과목',
  Professional: '전공과목',
  AfterSchool: '방과후',
} as const;

export type LinkCategory = keyof typeof LINK_CATEGORY_MAP;
export type LinkCategoryKorean = typeof LINK_CATEGORY_MAP[LinkCategory];

export const LINK_CATEGORY_ENGLISH_MAP: { [key in LinkCategoryKorean]?: LinkCategory } = {
  '인문과목': 'General',
  '전공과목': 'Professional',
  '방과후': 'AfterSchool',
};
