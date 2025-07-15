import { Container, LessonCardWrapper, InfoBoardWrapper} from './styles';
import { Directories } from '@/shared/theme/LessonTheme';

import LessonCard from './TLessonCard';
import InfoBoard from './TInfoBoard';

export default function TLesson() {
  return (
    <Container>
      <LessonCardWrapper>
        <LessonCard sections={Directories} />
      </LessonCardWrapper>
      <InfoBoardWrapper>
        <InfoBoard />
      </InfoBoardWrapper>
    </Container>
  );
}