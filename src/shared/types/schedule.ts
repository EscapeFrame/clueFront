export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export interface ScheduleItem {
  day: DayOfWeek;     // 요일 (월~금)
  period: number;     // 0 = 점심시간, 1~7 = 수업교시
  subject: string;    // 과목명 또는 "점심시간"
  description?: string; // 추가 설명 (선택사항)
}

// 시간표 정보
export const ScheduleTime: { [period: number]: { start: string; end: string } } = {
  1: { start: '08:40', end: '09:30' },
  2: { start: '09:40', end: '10:30' },
  3: { start: '10:40', end: '11:30' },
  4: { start: '11:40', end: '12:30' },
  0: { start: '12:30', end: '13:20' }, // 점심시간
  5: { start: '13:20', end: '14:10' },
  6: { start: '14:20', end: '15:10' },
  7: { start: '15:20', end: '16:10' },
};