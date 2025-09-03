import { useParams, useNavigate } from 'react-router-dom';
import { useAssignments } from '@/features/Common/Class/hooks/useAssignment';
import { AssignmentCard } from '@/entities/Class/AssignmentCard/Teacher';
import * as s from './styles';
import Button from '@/entities/UI/Button';

export const AssignmentComponent: React.FC = () => {
  const { classId, classRoomId } = useParams<{ classId?: string; classRoomId?: string }>();
  const effectiveId = classId ?? classRoomId;

  // 훅은 항상 최상단에서 호출
  const { assignments, loading, error } = useAssignments(effectiveId);
  const navigate = useNavigate();

  const MakeTask = () => {
    if (!classRoomId) return;
    navigate(`/class/${classRoomId}/make/task`);
  };

  return (
    <s.Container>
      <s.Header>
        <s.AddButton>
          <Button text="과제 추가하기" width="10rem" type={0} onClick={MakeTask} />
        </s.AddButton>
      </s.Header>
      {loading && <div>로딩 중...</div>}
      {error && <div style={{ color: 'red', margin: '1rem 0' }}>{error}</div>}

      {!loading && !error && (
        <s.Grid>
          {assignments.map(a => (
            <AssignmentCard
              key={a.id}
              data={a}
              classRoomId={String(effectiveId)}
              updateAssignment={(id, changes) => {
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