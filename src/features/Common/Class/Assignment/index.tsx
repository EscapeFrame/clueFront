import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AssignmentCard } from '@/entities/Class/AssignmentCard/Student';
import { Assignment } from '@/shared/types/Class/Assignment/Attachment';
import { AssignmentsApi } from '@/features/Common/Class/api/useAssignment';
import * as s from './styles';

export const AssignmentComponent: React.FC = () => {
  const { classId, classRoomId } = useParams<{ classId?: string; classRoomId?: string }>();
  const effectiveId = classId ?? classRoomId;
  const [assignmentList, setAssignmentList] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트 마운트 시(또는 effectiveId가 바뀔 때) 과제 목록 API 호출
  useEffect(() => {
    if (!effectiveId) return;

    setLoading(true);
    AssignmentsApi.getAll(effectiveId)
      .then((data) => {
        // API에서 받은 AssignmentResponse[]를 Assignment[]로 강제 변환
        // 실제로는 매핑 로직을 넣는 게 안전하지만 지금은 타입 단언으로 처리..
        setAssignments(data as unknown as Assignment[]);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("과제를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [effectiveId]);

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