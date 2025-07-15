import {
  LessonPageContainer,ContentContainer,
  LessonCardWrapper,InfoBoardWrapper,
} from "./styles";
import { Directories } from "@/shared/theme/LessonTheme";
import LessonCard from "./LessonCard";
import InfoBoard from "./InfoBoard/InfoBoard";

export default function Lesson() {
  return (
    <LessonPageContainer>
      <ContentContainer>
        <LessonCardWrapper>
          <LessonCard sections={Directories} />
        </LessonCardWrapper>
        <InfoBoardWrapper>
          <InfoBoard />
        </InfoBoardWrapper>
      </ContentContainer>
    </LessonPageContainer>
  );
}