import * as s from './styles';
import DdayCard from '@/entities/Main/DdayCard/index';
import dayjs from 'dayjs';
import { Posts, Post } from './data';

export default function TaskGuide(): React.ReactNode {
  const today = dayjs();

  // D-day 가까운 순으로 정렬 (오름차순)
  const sortedPosts = [...Posts].sort((a, b) => {
    const aDue = dayjs(a.dueDate);
    const bDue = dayjs(b.dueDate);

    return aDue.diff(today, 'day') - bDue.diff(today, 'day');
  });

  return (
    <s.Container>
        <s.Title>수행평가 안내</s.Title>
        <s.Explain>간편하게 수행평가를 확인하세요!</s.Explain>
        <s.CardContainer>
          {sortedPosts.map((post: Post, index: number) => {
            const due = dayjs(post.dueDate);
            const remainingDays = due.diff(today, 'day');

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