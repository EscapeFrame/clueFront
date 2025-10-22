import * as s from './styles';
import { QuickLink } from '@/features/Common/Main/QuickLink';
import PendingTask from '@/features/Common/Main/PendingTask';
import TaskGuide from '@/features/Common/Main/TaskGuide';
import Notice from '@/features/Common/Main/Notice';
import { MySchedule } from '@/features/Common/Main/Schedule';

// const test = async () => {
//     const res = await ('/test/duck', { name: 'duck' });
//     console.log(res);
// }

export default function Home() {


    return (
        <s.Container>
            <s.Left>
                <MySchedule />
                <PendingTask />     {/* 미제출과제*/}
                <TaskGuide />       {/* 수행평가 안내*/}
                <QuickLink />       {/* 학교서비스바로가기 */}
            </s.Left>
            <s.Right>
                <Notice />          {/* 공지사항 */}
            </s.Right>
        </s.Container >
    );
}