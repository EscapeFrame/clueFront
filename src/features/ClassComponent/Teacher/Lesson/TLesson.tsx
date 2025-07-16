import { Container, LessonCardWrapper, InfoBoardWrapper} from './styles';
import { useEffect, useState } from 'react';
import TCustomapi from '@/shared/api/Taxios';
import { useParams } from 'react-router-dom';

import LessonCard from './TLessonCard';
import InfoBoard from './TInfoBoard';

export default function TLesson() {
  const { classId } = useParams<{ classId: string }>();
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    if (classId) {
      TCustomapi.get(`/api/class/${classId}/all`)
        .then(res => {
          const data = res.data;
          // directoryList를 DirectorySection[] 형태로 변환
          const sections = (data.directoryList ?? []).map((dir: any) => ({
            classRoomId: String(data.classRoomId),
            title: dir.directoryName,
            items: (dir.documentList ?? []).map((doc: any) => ({
              id: doc.documentId,
              name: doc.title,
              directoryOrder: dir.directoryOrder,
              url: undefined,
              isRead: false,
            })),
            isExpanded: false,
          }));
          setDirectories(sections);
        })
        .catch(err => console.error(err));
    }
  }, [classId]);

  return (
    <Container>
      <LessonCardWrapper>
        <LessonCard sections={directories} classId={classId} />
      </LessonCardWrapper>
      <InfoBoardWrapper>
        <InfoBoard />
      </InfoBoardWrapper>
    </Container>
  );
}