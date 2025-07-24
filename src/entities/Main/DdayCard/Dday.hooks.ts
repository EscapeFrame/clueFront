import { useMemo } from 'react';

export interface DDayCardProps {
  dDay: number;      // 남은 일수
  content: string;   // 최대 30자 텍스트
  url: string;
  title: string;     // 제목 추가
}

export function useDDayCard(content: string) {
  // 최대 30자 자르기
  const trimmedContent = useMemo(() => {
    if (content.length > 30) {
      return content.slice(0, 30) + '...';
    }
    return content;
  }, [content]);

  return { trimmedContent };
}

export function useIsUrgent(dDay: number) {
  // D-day~6일 빨간색, 8~14일 회색
  return dDay >= 0 && dDay < 7;
}