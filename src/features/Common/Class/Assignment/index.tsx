import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AssignmentCard } from '@/entities/Class/AssignmentCard';
import { Assignment, AssignmentProps } from '@/shared/types/classroom';
import * as s from './styles';
import { AssignmentsApi } from '../api';

export const AssignmentComponent: React.FC<AssignmentProps> = () => {
  const { classId } = useParams<{ classId: string }>(); 
  const [assignmentList, setAssignmentList] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        if (!classId) throw new Error('classId가 없습니다.');
        const data = await AssignmentsApi(classId);
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
  const updateAssignment = (id: string, changes: Partial<Assignment>) => {
    setAssignmentList(prev =>
      prev.map(a => (a.id === id ? { ...a, ...changes } : a))
    );
  };

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