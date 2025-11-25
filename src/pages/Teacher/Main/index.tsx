import { lazy, Suspense } from 'react';
import * as s from './styles';

// Lazy load components
const MySchedule = lazy(() => import('@/features/Common/Main/Schedule').then(module => ({ default: module.MySchedule })));
const PendingTask = lazy(() => import('@/features/Common/Main/PendingTask'));
const TaskGuide = lazy(() => import('@/features/Common/Main/TaskGuide'));
const QuickLink = lazy(() => import('@/features/Common/Main/QuickLink').then(module => ({ default: module.QuickLink })));
const Notice = lazy(() => import('@/features/Common/Main/Notice'));

// 로딩 컴포넌트
const LoadingFallback = () => (
    <s.LoadingBox>
        <s.LoadingText>로딩 중...</s.LoadingText>
    </s.LoadingBox>
);

export default function Home() {
    return (
        <s.Container>
            <s.Left>
                <Suspense fallback={<LoadingFallback />}>
                    <MySchedule />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <PendingTask />     {/* 미제출과제*/}
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <TaskGuide />       {/* 수행평가 안내*/}
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <QuickLink />       {/* 학교서비스바로가기 */}
                </Suspense>
            </s.Left>
            <s.Right>
                <Suspense fallback={<LoadingFallback />}>
                    <Notice />          {/* 공지사항 */}
                </Suspense>
            </s.Right>
        </s.Container >
    );
}