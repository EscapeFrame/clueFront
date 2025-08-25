import { ScheduleTable } from './ScheduleTable/index';
import { ScheduleTimeline } from './ScheduleTimeline/index';
import { ScheduleItem } from '@/shared/types/schedule';
import * as s from './styles';
import { useEffect, useState } from 'react';
import { getScheduleTimeTable } from '../../api';

interface MyScheduleProps {
  data: (ScheduleItem | null)[];
}

export const MySchedule = () => {
  const grade = '1';
  const classNumber = '1';
  
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const filteredData = schedule.filter((item): item is ScheduleItem => item !== null);

  const today = new Date().getDay(); // 0~6 (일~토)
  const dayKeys = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
  
  // 평일만 고려, 없으면 기본값 'MON'
  const todayKey = (dayKeys[today] as ScheduleItem['day']) ?? 'MON';

  const handleClickSubject = (subject: string) => {
    alert(`이동할 과목: ${subject}`);
  };

  useEffect(() => {
    getScheduleTimeTable(grade, classNumber).then((data: MyScheduleProps) => {
      if (Array.isArray(data)) {
        setSchedule(data);
      } else {
        console.error('주간 시간표 조회 실패, 상태 코드:', data);
      }
    }).catch((err: any) => console.error('스케줄 로딩 실패:', err));
  }, []);

  return (
    <s.Container>
      <s.Title>나의 일과보기</s.Title>
      <s.Explain>빠르게 나의 수업을 확인해 보세요!</s.Explain>
      <s.Wrapper>
        <s.Half>
          <ScheduleTable data={filteredData} />
        </s.Half>
        <s.Half>
          <ScheduleTimeline data={filteredData} today={todayKey} onClickSubject={handleClickSubject} />
        </s.Half>
      </s.Wrapper>
    </s.Container>
  );
};