/** @jsxImportSource @emotion/react */
import { dummyDataGroups } from '@/shared/theme/AssignmentTheme';
import { TAssignmentGroup } from './TAssignmentGroup';
import * as S from '@/features/ClassComponent/Assignment/styles';

export function TAssignment() {
  return (
    <S.Container>
      {dummyDataGroups.map((group, index) => (
        <TAssignmentGroup key={index} cards={group.cards} />
      ))}
    </S.Container>
  );
}