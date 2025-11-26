export type CategoryKey = '전체' | '일반과목' | '전공과목' | '방과후';

export const CATEGORY_FILTER_MAP: Record<CategoryKey, 'GENERAL' | 'MAJOR' | 'AFTER' | null> = {
  '전체': null,
  '일반과목': 'GENERAL',
  '전공과목': 'MAJOR',
  '방과후': 'AFTER',
};

export const getCategoryLabel = (key?: string | null) => {
  if (!key) return null;
  switch (key) {
    case 'GENERAL':
      return '일반과목';
    case 'MAJOR':
      return '전공과목';
    case 'AFTER':
      return '방과후';
    default:
      return key;
  }
};