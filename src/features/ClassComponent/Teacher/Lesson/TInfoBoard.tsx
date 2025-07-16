import TInquiry from "./TInquiry";
import TNotice from "./Notice/TNotice";
import * as S from "@/features/ClassComponent/Lesson/InfoBoard/styles";

export default function TInfoBoard() {
  return (
    <S.Wrapper>
      <TNotice />
      <TInquiry />
    </S.Wrapper>
  );
}