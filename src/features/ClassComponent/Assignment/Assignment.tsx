import { dummyDataGroups } from '@/shared/theme/AssignmentTheme';
import { AssignmentGroup } from './AssignmentGroup';
import { Container } from '@/features/ClassComponent/Assignment/styles';

export function Assignment() {
  return (
    <Container>
      {dummyDataGroups.map((group, index) => (
        <AssignmentGroup key={index} cards={group.cards} />
      ))}
    </Container>
  );
}