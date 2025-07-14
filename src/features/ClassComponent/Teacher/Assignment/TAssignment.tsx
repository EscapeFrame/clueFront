import cardThemeDummy from '../../../../shared/theme/CardTheme';
import { TAssignmentGroup } from './TAssignmentGroup';
import * as S from '@/features/ClassComponent/Assignment/styles';

export function TAssignment() {
  return (
    <S.Container>
      <TAssignmentGroup cards={cardThemeDummy} />
    </S.Container>
  );
}