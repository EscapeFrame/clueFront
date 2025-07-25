import { useState } from 'react';
import { AssignmentCard } from '@/entities/Class/AssignmentCard';
import { assignments as initialAssignments } from './data';
import { Assignment, AssignmentProps } from '@/shared/types/classroom';
import * as s from './styles';

export const AssignmentComponent: React.FC<AssignmentProps> = () => {
  const [assignmentList, setAssignmentList] = useState<Assignment[]>(initialAssignments);

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