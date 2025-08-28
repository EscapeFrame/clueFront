import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AssignmentCard } from '@/entities/Class/AssignmentCard';
import { AssignmentResponse } from '@/shared/types/class/assignment/assignment';
import * as s from './styles';
import { fetchAssignments } from '@/features/Common/Class/api/useAssignment';
import { UserContext } from '@/entities/Context/LoginContext';

export const AssignmentComponent: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [assignmentList, setAssignmentList] = useState<AssignmentResponse[]>([]);
  const userContext = useContext(UserContext);

  const user = userContext?.user;

  useEffect(() => {
    const loadAssignments = async () => {
      if (!classId) return;
      try {
        const data = await fetchAssignments(classId);
        setAssignmentList(data);
      } catch (err: any) {
        console.error('과제 불러오기 실패:', err);
      }
    };
    loadAssignments();
  }, [classId]);

  // async로 변경
  const updateAssignment = async (assignmentId: number, changes: Partial<AssignmentResponse>) => {
    if (user?.role !== 'TCH') {
      console.warn('권한 없음');
      return;
    }
    setAssignmentList(prev =>
      prev.map(a => (a.assignmentId === assignmentId ? { ...a, ...changes } : a))
    );
  };

  return (
    <s.Container>
      <s.Grid>
        {assignmentList.map(a => (
          <AssignmentCard
            key={a.assignmentId}
            data={a}
            updateAssignment={async (changes: Partial<AssignmentResponse>) => {
              if (user?.role !== 'TCH') return;
              await updateAssignment(a.assignmentId, changes);
            }}            
          />
        ))}
      </s.Grid>
    </s.Container>
  );
};