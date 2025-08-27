import { ScheduleTable } from './ScheduleTable';
import { ScheduleTimeline } from './ScheduleTimeline';
import { ScheduleItem } from '@/shared/types/timetable';
import * as s from './styles';
import { useTimeline } from '../hooks/useSchedule';

interface MyScheduleProps {
  grade: string;
  classNumber: string;
}

export const MySchedule: React.FC<MyScheduleProps> = ({ grade, classNumber }) => {
  const { schedule, loading, error } = useTimeline({ grade, classNumber });

  const filteredData = schedule.filter((item): item is ScheduleItem => item !== null);

  const todayIndex = new Date().getDay(); // 0~6
  const dayKeys = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
  const todayKey = (dayKeys[todayIndex] as ScheduleItem['day']) ?? 'MON';

  const handleClickSubject = (subject: string) => {
    alert(`이동할 과목: ${subject}`);
  };

  if (loading) return <s.Container>로딩중...</s.Container>;
  if (error) return <s.Container>{error}</s.Container>;

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