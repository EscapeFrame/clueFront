import * as s from './styles';
import DdayCard from '@/entities/Main/DdayCard/index';
// import { usePendingTasks } from '@/features/Common/Main/hooks/usePendingTask';
import dayjs from 'dayjs';
import { PendingTaskItem } from '@/shared/types/task';

const dummyTasks: PendingTaskItem[] = [
  {
    id: '1',
    title: '수학 과제 - 미분과 적분',
    endDate: '2025-10-25',
    body: '미분과 적분 연습문제 풀이',
    link: 'https://example.com/math-assignment',
    available: true,
  },
  {
    id: '2',
    title: '영어 과제 - 에세이 작성',
    endDate: '2025-10-28',
    body: '자유 주제 에세이 500단어 이상',
    link: 'https://example.com/english-essay',
    available: false,
  },
  {
    id: '3',
    title: '과학 과제 - 실험 보고서',
    endDate: '2025-11-01',
    body: '화학 실험 보고서 작성',
    link: 'https://example.com/science-report',
    available: true,
  },
    {
    id: '3',
    title: '과학 과제 - 실험 보고서',
    endDate: '2025-11-01',
    body: '화학 실험 보고서 작성',
    link: 'https://example.com/science-report',
    available: true,
  },
    {
    id: '3',
    title: '과학 과제 - 실험 보고서',
    endDate: '2025-11-01',
    body: '화학 실험 보고서 작성',
    link: 'https://example.com/science-report',
    available: true,
  },
    {
    id: '3',
    title: '과학 과제 - 실험 보고서',
    endDate: '2025-11-01',
    body: '화학 실험 보고서 작성',
    link: 'https://example.com/science-report',
    available: true,
  },
    {
    id: '3',
    title: '과학 과제 - 실험 보고서',
    endDate: '2025-11-01',
    body: '화학 실험 보고서 작성',
    link: 'https://example.com/science-report',
    available: true,
  },
];

export default function PendingTask(): React.ReactNode {
  // const { tasks, loading, error } = usePendingTasks();
  const tasks = dummyTasks;
  const loading = false;
  const error = null;
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
          if (!post.endDate) return null;
          const endDate = dayjs(post.endDate);
          const daysLeft = endDate.diff(today, 'day'); // 남은 일수 계산

          if (endDate.isBefore(today, 'day')) return null; // 마감일이 오늘 이전인 경우 제외

          console.log('Rendering task:', post.title, 'End Date:', post.endDate, 'Days Left:', daysLeft);
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