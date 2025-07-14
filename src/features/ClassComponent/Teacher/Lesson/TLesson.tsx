import { Container, LessonCardWrapper, InfoBoardWrapper} from './styles';
import { Lessons } from '@/shared/theme/LessonTheme';

import LessonCard from './TLessonCard';
import InfoBoard from './TInfoBoard';

export default function TLesson() {
  return (
    <Container>
      <LessonCardWrapper>
        <LessonCard sections={Lessons} />
      </LessonCardWrapper>
      <InfoBoardWrapper>
        <InfoBoard />
      </InfoBoardWrapper>
    </Container>
  );
}