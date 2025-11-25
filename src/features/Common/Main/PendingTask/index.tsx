import * as s from './styles';
import DdayCard from '@/entities/Main/DdayCard/index';
import { usePendingTasksQuery } from '@/features/Common/Main/api/usePendingTaskQuery';
import { useAuth } from '@/app/hooks/useAccessToken';
import dayjs from 'dayjs';
import { PendingTaskItem } from '@/shared/types/task';

export default function PendingTask(): React.ReactNode {
  const { data: tasks = [], isLoading: loading, error } = usePendingTasksQuery();
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
          <s.ErrorText>{error.message || '과제를 불러오는 중 오류가 발생했습니다.'}</s.ErrorText>
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
        {tasks.map((post: PendingTaskItem, index: number) => {
          if (!post.endDate) return null;
          const endDate = dayjs(post.endDate);
          const daysLeft = endDate.diff(today, 'day'); // 남은 일수 계산

          if (endDate.isBefore(today, 'day')) return null; // 마감일이 오늘 이전인 경우 제외

          return (
            <DdayCard
              key={post.title || index}
              dDay={daysLeft} // 예시: D-3
              url={post.available ? post.link : ''}
              title={post.title}
            />
          );
        })}
      </s.CardContainer>
    </s.Container>
  );
}