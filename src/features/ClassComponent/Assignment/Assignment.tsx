import cardThemeDummy from '@/shared/theme/CardTheme';
import { AssignmentGroup } from './AssignmentGroup';
import { Container } from '@/features/ClassComponent/Assignment/styles';
import Customapi from '@/shared/api/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// 첨부 파일 타입
export interface AssignmentFile {
  fileId: number;         // 파일 ID
  fileName: string;       // 원본 파일 이름
  fileSize: number;       // 파일 크기 (MB 단위)
}

// 과제 타입
export interface Assignment {    // 과제 ID
  assignmentId : number;
  title: string;              // 과제 제목  
  startDate: string;
  endDate: string;            // 마감일 (ISO-8601 권장)
  duringDate: string;         // 남은 기간 (DDHH)
  files: AssignmentFile[];    // 첨부 파일 리스트
}


export function Assignment() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

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
    <Container>
      <AssignmentGroup cards={assignments} />
    </Container >
  );
}