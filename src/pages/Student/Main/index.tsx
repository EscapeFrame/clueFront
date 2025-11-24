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
      <s.Left>
        <MySchedule />
        <PendingTask />     {/* 미제출과제*/}
        <TaskGuide />       수행평가 안내
        <QuickLink />       {/* 학교서비스바로가기 */}
      </s.Left>
      <s.Right>
        <Notice />          {/* 공지사항 */}
      </s.Right>
    </HomeLayout>
  );
}