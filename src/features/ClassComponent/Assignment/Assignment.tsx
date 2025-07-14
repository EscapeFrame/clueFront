import cardThemeDummy from '@/shared/theme/CardTheme';
import { AssignmentGroup } from './AssignmentGroup';
import { Container } from '@/features/ClassComponent/Assignment/styles';

export function Assignment() {
  return (
    <Container>
      <AssignmentGroup cards={cardThemeDummy} />
    </Container >
  );
}