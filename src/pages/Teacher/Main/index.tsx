import * as s from './styles';import { useEffect, useState } from 'react';
import { QuickLink } from '@/features/Common/Main/QuickLink';
import PendingTask from '@/features/Common/Main/PendingTask';
import TaskGuide from '@/features/Common/Main/TaskGuide';
import Notice from '@/features/Common/Main/Notice';
import Footer from '@/widgets/Footer';
import { MySchedule } from '@/features/Common/Main/Schedule';

// const test = async () => {
//     const res = await ('/test/duck', { name: 'duck' });
//     console.log(res);
// }

export default function Home() {
    return (
        <s.Container>
            <MySchedule />
            <TaskGuide />       {/* 수행평가 안내*/}
            <PendingTask />     {/* 미제출과제*/}
            <Notice />          {/* 공지/안내 */}
            {/* 성취도 분석(추후 추가예정) */}
            <QuickLink />       {/* 학교서비스바로가기 */}
            <Footer />
        </s.Container>
    );
}