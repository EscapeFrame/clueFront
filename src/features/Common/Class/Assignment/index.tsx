import React from 'react';
import { useParams } from 'react-router-dom';
import { AssignmentCard } from '@/entities/Class/AssignmentCard';
import { useAssignments } from '@/features/Common/Class/hooks/useAssignment';
import * as s from './styles';

export const AssignmentComponent: React.FC = () => {
  // URL에서 classId나 classRoomId 가져오기
  const { classId, classRoomId } = useParams<{ classId?: string; classRoomId?: string }>();
  const effectiveId = classId ?? classRoomId;

  // useAssignments 훅 사용
  const { assignments, loading, error } = useAssignments(effectiveId);

  if (loading) return <div>로딩 중...</div>;

  return (
    <s.Container>
      {error ? (
        <div style={{ color: 'red', margin: '1rem 0' }}>{error}</div>
      ) : (
        <s.Grid>
          {assignments.map(a => (
            <AssignmentCard
              key={a.id}
              data={a}
              updateAssignment={(id, changes) => {
                // 로컬 상태 업데이트 (예: 제출 여부 변경)
                const idx = assignments.findIndex(x => x.id === id);
                if (idx >= 0) assignments[idx] = { ...assignments[idx], ...changes };
              }}
            />
          ))}
        </s.Grid>
      )}
    </s.Container>
  );
};