import Customapi from '@/shared/api/axios';
import { TAssignmentGroup } from './TAssignmentGroup';
import * as S from '@/features/ClassComponent/Assignment/styles';
import { AssignmentType } from '@/shared/types/Assignment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function TAssignment() {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);

  const { classId } = useParams<{ classId: string }>();

  useEffect(() => {
    if (classId) {
      Customapi.get(`/api/assignments/${classId}`)
        .then(res => { 
          console.log(res.data);
          setAssignments(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [classId]);
  return (
    <S.Container>
      <TAssignmentGroup cards={assignments} />
    </S.Container>
  );
}