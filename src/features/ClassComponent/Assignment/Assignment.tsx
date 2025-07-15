import * as S from '@/features/ClassComponent/Assignment/styles';
import { AssignmentCard } from './AssignmentCard';
import { dummyDataGroups, AssignmentData } from '@/shared/theme/AssignmentTheme';

export function Assignment() {
  const cards: AssignmentData[] = dummyDataGroups[0].cards;

  return (
    <S.Container>
      <S.GroupSection>
        <S.CardGrid>
          {cards.map((card) => (
            <AssignmentCard key={card.id} data={card} />
          ))}
        </S.CardGrid>
      </S.GroupSection>
    </S.Container>
  );
}