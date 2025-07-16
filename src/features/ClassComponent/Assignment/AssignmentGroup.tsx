import { AssignmentCard } from './AssignmentCard';
import { GroupSection, CardGrid } from '@/features/ClassComponent/Assignment/styles';
import { AssignmentType } from '@/shared/types/Assignment';

export function AssignmentGroup({ cards }: { cards: AssignmentType[] }) {
  return (
    <GroupSection>
      <CardGrid>
        {cards.map((card, idx) => (
          <AssignmentCard key={card.files[0]?.fileId ?? idx} data={card} />
        ))}
      </CardGrid>
    </GroupSection>
  );
}