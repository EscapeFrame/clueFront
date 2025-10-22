export type CategoryKey = '전체' | '일반과목' | '전공과목' | '방과후';

export const CATEGORY_FILTER_MAP: Record<CategoryKey, 'sort' | 'professional' | 'afterSchool' | null> = {
  '전체': null,
  '일반과목': 'sort',
  '전공과목': 'professional',
  '방과후': 'afterSchool',
};