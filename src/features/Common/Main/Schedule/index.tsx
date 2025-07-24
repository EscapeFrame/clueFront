import { ScheduleTable } from './ScheduleTable/index';
import { ScheduleTimeline } from './ScheduleTimeline/index';
import { ScheduleItem } from '@/shared/types/schedule';
import * as s from './styles';

interface MyScheduleProps {
  data: (ScheduleItem | null)[];
}

export const MySchedule: React.FC<MyScheduleProps> = ({ data }) => {
  const filteredData = data.filter((item): item is ScheduleItem => item !== null);

  const today = new Date().getDay(); // 0~6 (일~토)
  const dayKeys = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
  // 평일만 고려, 없으면 기본값 'MON'
  const todayKey = (dayKeys[today] as ScheduleItem['day']) ?? 'MON';

  const handleClickSubject = (subject: string) => {
    alert(`이동할 과목: ${subject}`);
  };

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