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
<<<<<<< HEAD
import { Assignment, AssignmentProps } from '@/shared/types/classroom';
=======
import { AssignmentResponse } from '@/shared/types/class/assignment/assignment';
>>>>>>> 956c12b (fix(#111): 머지 충돌 해결)
import * as s from './styles';
import { fetchAssignments } from '@/features/Common/Class/api/useAssignment';
import { useUser } from '@/shared/context/UserContext';

export const AssignmentComponent: React.FC = () => {
  const { user } = useUser();
  const { classId } = useParams<{ classId: string }>();
  const [assignmentList, setAssignmentList] = useState<AssignmentResponse[]>([])

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        if (!classId) throw new Error('classId가 없습니다.');
        const data = await fetchAssignments(classId);
        setAssignmentList(data);
      } catch (err: any) {
        console.error('과제 불러오기 실패:', err);
<<<<<<< HEAD
      } finally {
        setLoading(false);
=======
>>>>>>> 956c12b (fix(#111): 머지 충돌 해결)
      }
    };

    loadAssignments();
  }, [classId]);

  // 특정 과제 수정 (TCH만 가능)
  const updateAssignment = (assignmentId: number, changes: Partial<AssignmentResponse>) => {
    if (user?.role !== 'TCH') {
      console.warn('권한 없음');
      return;
    }
    setAssignmentList(prev =>
      prev.map(a => (a.assignmentId === assignmentId ? { ...a, ...changes } : a))
    );
  };
>>>>>>> 1793421 (feat(#93): features/Common/Class  axios 연결)

  return (
    <s.Container>
      <s.Grid>
        {assignmentList.map((a) => (
          <AssignmentCard
            key={a.assignmentId}
            data={a}
            updateAssignment={
              user?.role === 'TCH'
                ?(changes: Partial<AssignmentResponse>) =>
                updateAssignment(a.assignmentId, changes)
            : undefined // 권한 없으면 전달하지 않음
            }
          />
        ))}
      </s.Grid>
    </s.Container>
  );
};