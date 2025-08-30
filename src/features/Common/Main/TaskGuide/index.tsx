import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import * as s from './styles';
import DdayCard from '@/entities/Main/DdayCard/index';
import { PendingTaskItem } from '@/shared/types/task';
import { fetchPosts } from '@/features/Common/Main/api/useTaskGuide';

export default function TaskGuide(): React.ReactNode {
  const [posts, setPosts] = useState<PendingTaskItem[]>([]);
  const today = dayjs();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(
          data.sort((a, b) => dayjs(a.dueDate).diff(today, 'day') - dayjs(b.dueDate).diff(today, 'day'))
        );
      } catch (error) {
        console.error('실패: ', error);
      }
    };

    getPosts();
  }, []);

  return (
    <s.Container>
      <s.Title>수행평가 안내</s.Title>
      <s.Explain>간편하게 수행평가를 확인하세요!</s.Explain>
      <s.CardContainer>
        {posts.map((post, index) => {
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