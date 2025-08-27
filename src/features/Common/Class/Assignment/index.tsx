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