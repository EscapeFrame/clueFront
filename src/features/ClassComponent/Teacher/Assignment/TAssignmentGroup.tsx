/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { AssignmentGroup as AssignmentGroupType } from '@/shared/theme/AssignmentTheme';
import { TAssignmentCard } from './TAssignmentCard';
import { useParams } from 'react-router-dom';
import TCheckStudent from './TCheckStudent';
import {Button, GroupSection, CardGrid} from '@/features/ClassComponent/Assignment/styles';

export function TAssignmentGroup({ cards }: AssignmentGroupType) {
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
          <TAssignmentCard key={card.id} data={card} onCheck={() => setSelectedLessonId(card.id)} />
        ))}
      </CardGrid>
    </GroupSection>
  );
}
