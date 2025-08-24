<<<<<<< HEAD
import * as s from './styles';
import { AssignmentCard } from '@/entities/Class/AssignmentCard';
import { useAssignments } from '../hooks/useAssignment';
import { AssignmentResponse } from '@/shared/types/class/assignment/assignment';

interface AssignmentComponentProps {
  classRoomId: string;
}

export const AssignmentComponent: React.FC<AssignmentComponentProps> = ({ classRoomId }) => {
  const { assignments, error, modifyAssignment } = useAssignments(classRoomId);

  if (error) return <p>{error}</p>;
=======
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
>>>>>>> 1793421 (feat(#93): features/Common/Class  axios 연결)

  return (
    <s.Container>
      <s.Grid>
        {assignments.map((a: AssignmentResponse) => (
          <AssignmentCard
            key={a.assignmentId}
            data={a}
            updateAssignment={(changes: Partial<AssignmentResponse>) => modifyAssignment(a.assignmentId, changes)}
          />
        ))}
      </s.Grid>
    </s.Container>
  );
};