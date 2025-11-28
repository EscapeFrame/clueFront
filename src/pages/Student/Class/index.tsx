import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as s from './styles';

import { ClassInfo } from '@/entities/Class/ClassInfo';
import TabSelector from '@/entities/UI/TabSelect';
import LessonComponent from '@/features/Common/Class/Lesson';
import { AssignmentComponent } from '@/features/Common/Class/Assignment';
import { tabs } from './data';
import { getClassInfo as fetchClassData } from '@/entities/Class/api';
import { ClassInfoProps } from '@/shared/types/Class/classroom';
import NotFound from '@/pages/NotFound';

const Classroom: React.FC = () => {
  const { classRoomId } = useParams<{ classRoomId: string }>();
  const [activeTab, setActiveTab] = useState('lesson');

  // API로 가져온 클래스 정보를 담을 state
  const [classInfo, setClassInfo] = useState<ClassInfoProps | null>(null);
  console.log("값",classInfo);

  useEffect(() => {
    const savedTab = localStorage.getItem('classroom-tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // classRoomId가 있을 때 API 호출
  useEffect(() => {
    if (!classRoomId) return;

    fetchClassData(classRoomId)
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
    localStorage.setItem('classroom-tab', 'lesson');
  };

  if (!classRoomId) return <NotFound />;

  const renderContent = () => {
    switch (activeTab) {
      case 'lesson':
        return <LessonComponent classRoomId={classRoomId} code={classInfo?.code} />;
      case 'assignment':
        return <AssignmentComponent />;
      // case 'exam':
        // return <ExamComponent />;
      default:
        return null;
    }
  };

  return (
    <s.Container>
      {classInfo ? (
        <ClassInfo {...classInfo} />
      ) : (
        <div style={{ padding: '1rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ width: 360, height: 22, borderRadius: 6, background: '#e9ecef' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: '#e9ecef' }} />
                <div style={{ width: 220, height: 14, borderRadius: 6, background: '#f1f3f5' }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ width: '100%', height: 12, borderRadius: 6, background: '#f1f3f5', marginBottom: 8 }} />
            <div style={{ width: '90%', height: 12, borderRadius: 6, background: '#f1f3f5', marginBottom: 8 }} />
            <div style={{ width: '60%', height: 12, borderRadius: 6, background: '#f1f3f5' }} />
          </div>
        </div>
      )}
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