import * as s from './styles';
import { QuickLink } from '@/features/Common/Main/QuickLink';
import PendingTask from '@/features/Common/Main/PendingTask';
import TaskGuide from '@/features/Common/Main/TaskGuide';
import Notice from '@/features/Common/Main/Notice';
import Footer from '@/widgets/Footer';
import { MySchedule } from '@/features/Common/Main/Schedule';

export default function HomePage() {
  const grade = '1';       // 학년
  const classNumber = '1'; // 반

  return (
    <s.Container>
      <MySchedule grade={grade} classNumber={classNumber} />
      <TaskGuide />       {/* 수행평가 안내 */}
      <PendingTask />     {/* 미제출과제 */}
      <Notice />          {/* 공지/안내 */}
      {/* 성취도 분석(추후 추가예정) */}
      <QuickLink />       {/* 학교서비스 바로가기 */}
      <Footer />
    </s.Container>
  );
}