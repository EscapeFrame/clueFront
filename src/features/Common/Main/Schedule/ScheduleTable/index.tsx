import { ScheduleItem } from '@/shared/types/schedule';
import * as s from './styles';

interface Props {
  data: (ScheduleItem | null)[];
  maxPeriod?: number;
}

const DAYS = [
  { key: 'MON' },
  { key: 'TUE' },
  { key: 'WED' },
  { key: 'THU' },
  { key: 'FRI' },
];

export const ScheduleTable: React.FC<Props> = ({ data, maxPeriod = 7 }) => {
  const renderCell = (day: ScheduleItem['day'], period: number) => {
    const item = data.find(d => d?.day === day && d?.period === period);
    const subject = item ? item.subject : '-';
    return <s.Cell key={`${day}-${period}`}>{subject}</s.Cell>;
  };

  return (
    <s.TableWrapper>
      <s.Title>시간표</s.Title>
      <s.Table>
        <thead>
          <tr>
            <s.HeaderCell />
            {DAYS.map(day => (
              <s.HeaderCell key={day.key}>{day.key}</s.HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxPeriod }, (_, i) => {
            const period = i + 1; // 1~7교시
            return (
              <tr key={period}>
                <s.TimeCell>{period}교시</s.TimeCell>
                {DAYS.map(day => renderCell(day.key as ScheduleItem['day'], period))}
              </tr>
            );
          })}
        </tbody>
      </s.Table>
    </s.TableWrapper>
  );
};