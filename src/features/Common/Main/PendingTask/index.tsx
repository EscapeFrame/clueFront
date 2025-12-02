import * as s from './styles';
import DdayCard from '@/entities/Main/DdayCard/index';
import { usePendingTasks } from '@/features/Common/Main/hooks/usePendingTask';
import { useAuth } from '@/app/hooks/useAccessToken';
import dayjs from 'dayjs';
import { PendingTaskItem } from '@/shared/types/task';

export default function PendingTask(): React.ReactNode {
  const { tasks, loading, error } = usePendingTasks();
  const today = dayjs();
  const { user } = useAuth();
  const isTeacher = !!user && user.role === 'TEACHER';

  if (loading) {
    return (
    <s.Container>
      <s.Title>{isTeacher ? '나의 과제' : '미제출 과제'}</s.Title>
        <s.LoadingContainer>
          <s.LoadingText>과제를 불러오는 중...</s.LoadingText>
        </s.LoadingContainer>
      </s.Container>
    );
  }

  if (error) {
    return (
      <s.Container>
        <s.Title>{isTeacher ? '나의 과제' : '미제출 과제'}</s.Title>
        <s.ErrorContainer>
          <s.ErrorText>{error}</s.ErrorText>
        </s.ErrorContainer>
      </s.Container>
    );
  }

  if (tasks.length === 0) {
    return (
      <s.Container>
        <s.Title>{isTeacher ? '나의 과제' : '미제출 과제'}</s.Title>
        <s.EmptyContainer>
          <s.EmptyText>미제출 과제가 없습니다!</s.EmptyText>
        </s.EmptyContainer>
      </s.Container>
    );
  }

  return (
    <s.Container>
  <s.Title>{isTeacher ? '나의 과제' : '미제출 과제'}</s.Title>
  <s.Explain>{isTeacher ? '내가 만든 과제 목록입니다.' : '기간 안에 과제를 제출하세요!'}</s.Explain>
      <s.CardContainer>
        {(() => {
          type Mapped = { original: PendingTaskItem; daysLeft: number; endDate: dayjs.Dayjs };
          const mapped: Array<Mapped> = tasks
            .map((post: PendingTaskItem) => {
              if (!post.endDate) return null;
              const endDate = dayjs(post.endDate);
              const daysLeft = endDate.diff(today, 'day');
              return { original: post, daysLeft, endDate } as Mapped;
            })
            .filter((it): it is Mapped => it !== null && it !== undefined)
            .filter((it) => !it.endDate.isBefore(today, 'day'));

          mapped.sort((a, b) => a.daysLeft - b.daysLeft);

          return mapped.map((item, index) => (
            <DdayCard
              key={item.original.title || index}
              dDay={item.daysLeft}
              url={item.original.available ? item.original.link : ''}
              title={item.original.title}
            />
          ));
        })()}
      </s.CardContainer>
    </s.Container>
  );
}