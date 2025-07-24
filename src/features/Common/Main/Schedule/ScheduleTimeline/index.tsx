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
      <s.Title>수업 타임라인</s.Title>
      <s.List>
        {allItems.map(({ period, item }) => {
          const isNow = period === current;
          const isLunch = item?.subject === '점심시간';

          return (
            <s.Item key={period}>
              <s.Left>
                <s.Circle isNow={isNow} isLunch={isLunch}>
                  {isLunch ? <PiBowlFoodDuotone /> : `${period}교시`}
                </s.Circle>
              </s.Left>
              <s.Right onClick={() => item?.subject && onClickSubject?.(item.subject)}>
                <s.Card>
                  {item ? (
                    <s.CardText>
                      <s.Subject>{item.subject}</s.Subject>
                      {item.description && <s.Description>{item.description}</s.Description>}
                    </s.CardText>
                  ) : (
                    <s.CardText />
                  )}
                  {item && <s.ArrowIcon />}
                </s.Card>
              </s.Right>
            </s.Item>
          );
        })}
      </s.List>
    </s.Container>
  );
};