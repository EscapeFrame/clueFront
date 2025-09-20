export type CategoryKey = '전체' | '일반교과' | '전공교과' | '방과후교과';

export const CATEGORY_FILTER_MAP: Record<CategoryKey, string | null> = {
  '전체': null,
  '일반교과': 'sort',
  '전공교과': 'professional',
  '방과후교과': 'afterSchool',
};
