import * as s from './styles';
import DdayCard from '@/entities/Main/DdayCard';
import dayjs from 'dayjs';
import { usePendingTasks } from '../hooks/usePendingTask';

export default function PendingTask() {
  const today = dayjs();
  const { tasks, loading, error } = usePendingTasks();

  if (loading) return <s.Container>로딩중...</s.Container>;
  if (error) return <s.Container>{error}</s.Container>;

  const sortedTasks = [...tasks].sort((a, b) => {
    const aDue = dayjs(a.dueDate);
    const bDue = dayjs(b.dueDate);
    return aDue.diff(today, 'day') - bDue.diff(today, 'day');
  });

  return (
    <s.Container>
      <s.Title>미제출 과제</s.Title>
      <s.Explain>기간 안에 과제를 제출하세요!</s.Explain>
      <s.CardContainer>
        {sortedTasks.map((task, index) => {
          const remainingDays = dayjs(task.dueDate).diff(today, 'day');
          return (
            <DdayCard
              key={index}
              dDay={remainingDays}
              content={task.body}
              url={task.available ? task.link : ''}
              title={task.title}
            />
          );
        })}
      </s.CardContainer>
    </s.Container>
  );
}