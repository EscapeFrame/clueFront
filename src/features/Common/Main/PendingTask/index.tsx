import * as s from './styles';
import DdayCard from '@/entities/Main/DdayCard/index';
import { usePendingTasks } from '@/features/Common/Main/hooks/usePendingTask';
import dayjs from 'dayjs';
import { PendingTaskItem } from '@/shared/types/task';

export default function PendingTask(): React.ReactNode {
  const { tasks, loading, error, refetch } = usePendingTasks();
  const today = dayjs();

  if (loading) {
    return (
      <s.Container>
        <s.Title>미제출 과제</s.Title>
        <s.LoadingContainer>
          <s.LoadingText>과제를 불러오는 중...</s.LoadingText>
        </s.LoadingContainer>
      </s.Container>
    );
  }

  if (error) {
    return (
      <s.Container>
        <s.Title>미제출 과제</s.Title>
        <s.ErrorContainer>
          <s.ErrorText>{error}</s.ErrorText>
        </s.ErrorContainer>
      </s.Container>
    );
  }

  if (tasks.length === 0) {
    return (
      <s.Container>
        <s.Title>미제출 과제</s.Title>
        <s.EmptyContainer>
          <s.EmptyText>미제출 과제가 없습니다!</s.EmptyText>
        </s.EmptyContainer>
      </s.Container>
    );
  }

  return (
    <s.Container>
      <s.Title>미제출 과제</s.Title>
      <s.Explain>기간 안에 과제를 제출하세요!</s.Explain>
      <s.CardContainer>
        {tasks.map((post: PendingTaskItem, index: number) => {
          const due = dayjs(post.dueDate);
          const remainingDays = due.diff(today, 'day');

          return (
            <DdayCard
              key={post.id || index} // id가 있으면 id 사용, 없으면 index
              dDay={remainingDays}
              content={post.body}
              url={post.available ? post.link : ''}
              title={post.title}
            />
          );
        })}
      </s.CardContainer>
    </s.Container>
  );
}