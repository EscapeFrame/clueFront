import cardThemeDummy from '@/shared/theme/CardTheme';
import { AssignmentCard } from './AssignmentCard';
import { GroupSection, CardGrid } from '@/features/ClassComponent/Assignment/styles';

export function AssignmentGroup({ cards }: { cards: typeof cardThemeDummy }) {
  return (
    <GroupSection>
      <CardGrid>
        {cards.map(card => (
          <AssignmentCard key={card.fileId} data={card} />
        ))}
      </CardGrid>
    </GroupSection>
  );
}