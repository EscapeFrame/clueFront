import { ScheduleItem, ScheduleTime } from '@/shared/types/schedule';
import { PiBowlFoodDuotone } from "react-icons/pi";
import * as s from './styles';

interface Props {
  data: (ScheduleItem | null)[];
  today: ScheduleItem['day'];
  onClickSubject?: (subject: string) => void;
}

const getCurrentPeriod = (): number | null => {
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();

  for (const [periodStr, { start, end }] of Object.entries(ScheduleTime)) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;
    if (current >= startMin && current < endMin) return Number(periodStr);
  }
  return null;
};

export const ScheduleTimeline: React.FC<Props> = ({ data, today, onClickSubject }) => {
  const lunchPeriod: ScheduleItem = { period: 4.5, day: today, subject: '점심시간' };

  const todayItems = data.filter((item): item is ScheduleItem => item?.day === today);

  const allPeriods = [1, 2, 3, 4, 5, 6, 7];
  const scheduleItems = allPeriods.map(period => ({
    period,
    item: todayItems.find(i => i.period === period),
  }));

  const allItems = [...scheduleItems, { period: 4.5, item: lunchPeriod }].sort((a, b) => a.period - b.period);

  const current = getCurrentPeriod();

  return (
    <s.Container>
      <s.List>
        {allItems.map(({ period, item }) => {
          const isNow = period === current;
          // const isNow = true;
          const isLunch = item?.subject === '점심시간';

          return (
            <s.Item key={period}>
              <s.Right>
                <s.Card isNow={isNow} isLunch={isLunch} onClick={() => item?.subject && onClickSubject?.(item.subject)}>

                  {item ? (
                    <s.CardText>
                      <s.Subject><s.Period>{isLunch ? <PiBowlFoodDuotone /> : `${period}`}</s.Period>{item.subject}</s.Subject>
                      {item.description && <s.Description>{item.description}</s.Description>}
                    </s.CardText>
                  ) : (
                    <s.CardText>
                      <s.Subject><s.Period>{isLunch ? <PiBowlFoodDuotone /> : `${period}`}</s.Period>자습</s.Subject>
                    </s.CardText>
                  )}
                  {ScheduleTime[period] && (
                    <s.TimeText>{`${ScheduleTime[period].start} ~ ${ScheduleTime[period].end}`}</s.TimeText>
                  )}
                </s.Card>
              </s.Right>
            </s.Item>
          );
        })}
      </s.List>
    </s.Container>
  );
};