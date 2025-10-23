export type CategoryKey = '전체' | '일반과목' | '전공과목' | '방과후';

export const CATEGORY_FILTER_MAP: Record<CategoryKey, 'GENERAL' | 'MAJOR' | 'AFTER' | null> = {
  '전체': null,
  '일반과목': 'GENERAL',
  '전공과목': 'MAJOR',
  '방과후': 'AFTER',
};