/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { TAssignmentCard } from './TAssignmentCard';
import { useParams } from 'react-router-dom';
import TCheckStudent from './TCheckStudent';
import {Button, GroupSection, CardGrid} from '@/features/ClassComponent/Assignment/styles';
import { AssignmentType } from '@/shared/types/Assignment';

export function TAssignmentGroup({ cards }: { cards: AssignmentType[] }) {
  const { classId } = useParams<{ classId: string }>();
  const [selectedLessonId, setSelectedLessonId] = useState<string | number | null>(null);

  if (selectedLessonId) {
    return (
      <div>
        <Button onClick={() => setSelectedLessonId(null)}>← 뒤로가기</Button>
        <TCheckStudent classId={classId} lessonId={selectedLessonId} />
      </div>
    );
  }

  return (
    <GroupSection>
      <CardGrid>
        {cards.map(card => (
          <TAssignmentCard key={card.assignmentId} data={card} onCheck={() => setSelectedLessonId(card.files[0]?.fileId)} />
        ))}
      </CardGrid>
    </GroupSection>
  );
}
