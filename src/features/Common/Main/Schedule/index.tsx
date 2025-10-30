import { ScheduleTimeline } from './ScheduleTimeline';
import * as s from './styles';
import { useSchedule } from '../hooks/useSchedule';
import { ScheduleItem, Response, convertToScheduleItem } from '@/shared/types/schedule';

export const MySchedule = () => {
  const { schedule: rawSchedule, loading, error } = useSchedule();

  const schedule: ScheduleItem[] = convertToScheduleItem((rawSchedule ?? []) as unknown as Response[]);
  const dayKeys = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
  const todayKey = dayKeys[new Date().getDay()] as ScheduleItem['day'];

  const handleClickSubject = (subject: string) => {
    alert(`이동할 과목: ${subject}`);
  };

  return (
    <s.Container>
      <s.Title>나의 일과보기</s.Title>
      <s.Explain>빠르게 나의 수업을 확인해 보세요!</s.Explain>

      {loading && <p>로딩중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
          <s.Wrapper>
              <ScheduleTimeline data={schedule} today={todayKey} onClickSubject={handleClickSubject} />
          </s.Wrapper>
        </>
      )}
    </s.Container>
  );
};