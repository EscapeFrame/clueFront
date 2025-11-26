import { ScheduleTimeline } from './ScheduleTimeline';
import * as s from './styles';
import { useSchedule } from '../hooks/useSchedule';
import { ScheduleItem, Response, convertToScheduleItem } from '@/shared/types/schedule';
import { useState } from 'react';

export const MySchedule = () => {
  const { schedule: rawSchedule, loading, error } = useSchedule();

  // API 데이터 변환
  const schedule: ScheduleItem[] = !error && rawSchedule && rawSchedule.length > 0 
    ? convertToScheduleItem((rawSchedule ?? []) as unknown as Response[])
    : [];
    
  const dayKeys = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
  const todayKey = dayKeys[new Date().getDay()] as ScheduleItem['day'];
  
  // 선택된 요일 상태 (기본값: 오늘이 평일이면 오늘, 주말이면 월요일)
  const weekdays: ScheduleItem['day'][] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const initialDay = weekdays.includes(todayKey) ? todayKey : 'MON';
  const [selectedDay, setSelectedDay] = useState<ScheduleItem['day']>(initialDay);

  const handleClickSubject = (subject: string) => {
    alert(`이동할 과목: ${subject}`);
  };

  // 요일 한글 매핑
  const dayNameMap = {
    MON: '월',
    TUE: '화',
    WED: '수',
    THU: '목',
    FRI: '금',
  } as const;

  return (
    <s.Container>
      <s.Header>
        <s.TitleSection>
          <s.Title>나의 일과보기</s.Title>
          <s.Explain>빠르게 나의 수업을 확인해 보세요!</s.Explain>
        </s.TitleSection>
        
        <s.DaySelector>
          {weekdays.map((day) => (
            <s.DayButton
              key={day}
              active={selectedDay === day}
              isToday={day === todayKey}
              onClick={() => setSelectedDay(day)}
            >
              {dayNameMap[day]}
            </s.DayButton>
          ))}
        </s.DaySelector>
      </s.Header>

      {loading && <p>로딩중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <s.Wrapper>
              <ScheduleTimeline data={schedule} today={selectedDay} onClickSubject={handleClickSubject} />
          </s.Wrapper>
        </>
      )}
    </s.Container>
  );
};