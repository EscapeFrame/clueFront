import React from 'react';
import { QuickLink } from '@/features/Common/Main/QuickLink';
import PendingTask from '@/features/Common/Main/PendingTask';
import TaskGuide from '@/features/Common/Main/TaskGuide';
import Notice from '@/features/Common/Main/Notice';
import { MySchedule } from '@/features/Common/Main/Schedule';
import * as s from './styles';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return <s.Container>{children}</s.Container>;
};

export default function HomePage() {
  return (
    <HomeLayout>
      <MySchedule />
      <PendingTask />     {/* 미제출과제*/}
      <TaskGuide />       {/* 수행평가 안내*/}
      <Notice />          {/* 공지/안내 */}
      {/* 성취도 분석(추후 추가예정) */}
      <QuickLink />       {/* 학교서비스바로가기 */}
    </HomeLayout>
  );
}