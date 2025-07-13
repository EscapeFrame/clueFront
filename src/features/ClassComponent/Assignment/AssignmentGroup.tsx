import { AssignmentGroup as AssignmentGroupType } from '@/shared/theme/AssignmentTheme';
import { AssignmentCard } from './AssignmentCard';
import { GroupSection, CardGrid } from '@/features/ClassComponent/Assignment/styles';

export function AssignmentGroup({ cards }: AssignmentGroupType) {
  return (
    <GroupSection>
      <CardGrid>
        {cards.map(card => (
          <AssignmentCard key={card.id} data={card} />
        ))}
      </CardGrid>
    </GroupSection>
  );
}