import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import * as s from './styles';
import DdayCard from '@/entities/Main/TaskDdayCard/index';
import { PendingTaskItem } from '@/shared/types/task';
import { fetchPosts } from '@/features/Common/Main/api/useTaskGuide';

const dummyTaskGuides: PendingTaskItem[] = [
  {
    id: 'tg1',
    title: '국어 수행평가 - 시 분석',
    endDate: '2025-10-27',
    body: '교과서에 수록된 시 한 편을 선택하여 분석 보고서 작성',
    link: 'https://example.com/korean-poetry-analysis',
    available: true,
  },
  {
    id: 'tg2',
    title: '수학 수행평가 - 통계 프로젝트',
    endDate: '2025-11-15',
    body: '주어진 데이터를 활용하여 통계 분석 프로젝트 수행',
    link: 'https://example.com/math-stats-project',
    available: true,
  },
  {
    id: 'tg3',
    title: '사회 수행평가 - 역사 보고서',
    endDate: '2025-11-20',
    body: '특정 역사적 사건에 대한 보고서 작성',
    link: 'https://example.com/history-report',
    available: false,
  },
  {
    id: 'tg3',
    title: '사회 수행평가 - 역사 보고서',
    endDate: '2025-11-20',
    body: '특정 역사적 사건에 대한 보고서 작성',
    link: 'https://example.com/history-report',
    available: false,
  },
  {
    id: 'tg3',
    title: '사회 수행평가 - 역사 보고서',
    endDate: '2025-11-20',
    body: '특정 역사적 사건에 대한 보고서 작성',
    link: 'https://example.com/history-report',
    available: false,
  }, {
    id: 'tg3',
    title: '사회 수행평가 - 역사 보고서',
    endDate: '2025-11-20',
    body: '특정 역사적 사건에 대한 보고서 작성',
    link: 'https://example.com/history-report',
    available: false,
  }, {
    id: 'tg3',
    title: '사회 수행평가 - 역사 보고서',
    endDate: '2025-11-20',
    body: '특정 역사적 사건에 대한 보고서 작성',
    link: 'https://example.com/history-report',
    available: false,
  },
];

export default function TaskGuide(): React.ReactNode {
  const [posts, setPosts] = useState<PendingTaskItem[]>([]);
  // const posts = dummyTaskGuides;
  const today = dayjs();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();

        if (!Array.isArray(data)) {
          console.error('fetchPosts() 결과가 배열이 아님:', data);
          setPosts([]);
          return;
        }

        setPosts(
          data.sort((a, b) => dayjs(a.endDate).diff(today, 'day') - dayjs(b.endDate).diff(today, 'day'))
        );
      } catch (error) {
        console.error('수행평가 조회실패: ', error);
        setPosts([]);
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