import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as s from './styles';

import { ClassInfo } from '@/entities/Class/ClassInfo';
import TabSelector from '@/entities/UI/TabSelect';
import LessonComponent from '@/features/Common/Class/Lesson';
import { AssignmentComponent } from '@/features/Common/Class/Assignment';
import { ExamComponent } from '@/features/Common/Class/Exam';
import { classData, tabs } from './data';
import NotFound from '@/pages/NotFound';

const Classroom: React.FC = () => {
  const { classRoomId } = useParams<{ classRoomId: string }>();
  const [activeTab, setActiveTab] = useState('lesson');

  useEffect(() => {
    const savedTab = localStorage.getItem('classroom-tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

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
      <ClassInfo {...classData} />
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