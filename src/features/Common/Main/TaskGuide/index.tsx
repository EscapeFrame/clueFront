import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import * as s from './styles';
import DdayCard from '@/entities/Main/TaskDdayCard/index';
import { PendingTaskItem } from '@/shared/types/task';
import { fetchPosts } from '@/features/Common/Main/api/useTaskGuide';

export default function TaskGuide(): React.ReactNode {
  const [posts, setPosts] = useState<PendingTaskItem[]>([]);
  const today = dayjs();

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const data = await fetchPosts();

  //       if (!Array.isArray(data)) {
  //         console.error('fetchPosts() 결과가 배열이 아님:', data);
  //         setPosts([]);
  //         return;
  //       }

  //       setPosts(
  //         data.sort((a, b) => dayjs(a.endDate).diff(today, 'day') - dayjs(b.endDate).diff(today, 'day'))
  //       );
  //     } catch (error) {
  //       console.error('수행평가 조회실패: ', error);
  //       setPosts([]);
  //     }
  //   };

  //   getPosts();
  // }, []);

  const getPosts = async () => {
    try {
      setPosts([]);
    } catch (error) {
      console.error('수행평가 조회실패: ', error);
      setPosts([]);
    }
    };
  
  useEffect(() => {
    getPosts();
  }, []);

  

  return (
    <s.Container>
      <s.Title>수행평가 안내</s.Title>
      <s.Explain>간편하게 수행평가를 확인하세요!</s.Explain>
      <s.CardContainer>
        {posts.map((post, index) => {
          const remainingDays = dayjs(post.endDate).diff(today, 'day');
          return (
            <DdayCard
              key={index}
              dDay={remainingDays}
              url={post.available ? post.link : ''}
              title={post.title}
            />
          );
        })}
      </s.CardContainer>
    </s.Container>
  );
}