import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as s from './styles';

import { ClassInfo } from '@/entities/Class/ClassInfo';
import TabSelector from '@/entities/UI/TabSelect';
import LessonComponent from '@/features/Common/Class/Lesson';
import { AssignmentComponent } from '@/features/Common/Class/Assignment';
import { ExamComponent } from '@/features/Common/Class/Exam';
import { ClassData, tabs } from './data';
import { ClassInfoProps } from '@/shared/types/class/class';
import NotFound from '@/pages/NotFound';

const Classroom: React.FC = () => {
  const { classRoomId } = useParams<{ classRoomId: string }>();
  const [activeTab, setActiveTab] = useState('lesson');

  // API로 가져온 클래스 정보를 담을 state
  const [classInfo, setClassInfo] = useState<ClassInfoProps | null>(null);

  useEffect(() => {
    const savedTab = localStorage.getItem('classroom-tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // classRoomId가 있을 때 API 호출
  useEffect(() => {
    if (!classRoomId) return;

    ClassData(classRoomId)
      .then((data) => {
        if (typeof data === 'number') {
          console.error('클래스룸 조회 실패, 상태 코드:', data);
          return;
        }
        setClassInfo(data); // 이제 안전하게 상태에 넣음
      })
      .catch((err) => console.error('클래스룸 정보 로딩 실패: ', err));
  }, [classRoomId]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('classroom-tab', tab);
  };

  if (!classRoomId) return <NotFound />;

  const renderContent = () => {
    switch (activeTab) {
      case 'lesson':
        return <LessonComponent classRoomId={classRoomId} />;
      case 'assignment':
        return <AssignmentComponent classRoomId={classRoomId} />;
      case 'exam':
        return <ExamComponent />;
      default:
        return null;
    }
  };

  return (
    <s.Container>
      {classInfo ? <ClassInfo {...classInfo} /> : <p>로딩중...</p>}
      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <s.ContentArea>{renderContent()}</s.ContentArea>
    </s.Container>
  );
};

export default Classroom;