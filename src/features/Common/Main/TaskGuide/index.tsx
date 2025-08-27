import * as s from './styles';
import DdayCard from '@/entities/Main/DdayCard';
import dayjs from 'dayjs';
import { useTaskGuide } from '../hooks/useTaskGuide';

export default function TaskGuide() {
  const today = dayjs();
  const { posts, loading, error } = useTaskGuide();

  if (loading) return <s.Container>로딩중...</s.Container>;
  if (error) return <s.Container>{error}</s.Container>;

  const sortedPosts = [...posts].sort((a, b) => {
    const aDue = dayjs(a.dueDate);
    const bDue = dayjs(b.dueDate);
    return aDue.diff(today, 'day') - bDue.diff(today, 'day');
  });

  return (
    <s.Container>
      <s.Title>수행평가 안내</s.Title>
      <s.Explain>간편하게 수행평가를 확인하세요!</s.Explain>
      <s.CardContainer>
        {sortedPosts.map((post, index) => {
          const remainingDays = dayjs(post.dueDate).diff(today, 'day');

          return (
            <DdayCard
              key={index}
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