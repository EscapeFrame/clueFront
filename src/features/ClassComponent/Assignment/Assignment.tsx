import { AssignmentGroup } from './AssignmentGroup';
import { Container } from '@/features/ClassComponent/Assignment/styles';
import Customapi from '@/shared/api/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AssignmentType } from '@/shared/types/Assignment';


export function Assignment() {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);

  const { classId } = useParams<{ classId: string }>();

  useEffect(() => {
    if (classId) {
      Customapi.get(`/api/assignments/${classId}`)
        .then(res => { 
          console.log("데이터",res.data);
          setAssignments(res.data);
        })
        .catch(err => console.error("오류코등",err));
    }
  }, [classId]);

  return (
    <Container>
      <AssignmentGroup cards={assignments} />
    </Container >
  );
}