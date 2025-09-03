import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AssignmentCard } from '@/entities/Class/AssignmentCard/Student';
import { Assignment } from '@/shared/types/Class/Assignment/Attachment';
import * as s from './styles';
import { AssignmentsApi } from '../api';

export const AssignmentComponent: React.FC = () => {
  const { classId, classRoomId } = useParams<{ classId?: string; classRoomId?: string }>();
  const effectiveId = classId ?? classRoomId;
  const [assignmentList, setAssignmentList] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        if (!effectiveId) throw new Error('classId가 없습니다.');
        const data = await AssignmentsApi(effectiveId);
        setAssignmentList(data);
      } catch (err: any) {
        console.error('과제 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, [classId]);

  // 특정 과제 수정 함수
  const updateAssignment = (id: string|number, changes: Partial<Assignment>) => {
    setAssignmentList(prev =>
      prev.map(a => (a.id === id ? { ...a, ...changes } : a))
    );
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <s.Container>
      <s.Grid>
        {assignmentList.map(a => (
          <AssignmentCard
            key={a.id}
            data={a}
            updateAssignment={updateAssignment}
          />
        ))}
      </s.Grid>
    </s.Container>
  );
};