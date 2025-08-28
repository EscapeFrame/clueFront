import * as s from './styles';
import { useUser } from '@/entities/Context/UserContext';
import { QuickLink } from '@/features/Common/Main/QuickLink';
import PendingTask from '@/features/Common/Main/PendingTask';
import TaskGuide from '@/features/Common/Main/TaskGuide';
import Notice from '@/features/Common/Main/Notice';
import Footer from '@/widgets/Footer';
import { MySchedule } from '@/features/Common/Main/Schedule';

export default function StudentHome() {
  const { user } = useUser();
  if (!user) {
    return <s.Container>사용자 정보가 없습니다.</s.Container>;
  }
  return (
    <s.Container>
      <MySchedule role="STU" grade={user.grade} classNumber={user.classNumber} />
      <TaskGuide />       {/* 수행평가 안내 */}
      <PendingTask />     {/* 미제출과제 */}
      <Notice />          {/* 공지/안내 */}
      {/* 성취도 분석(추후 추가 예정) */}
      <QuickLink />       {/* 학교서비스 바로가기 */}
      <Footer />
    </s.Container>
  );
} 