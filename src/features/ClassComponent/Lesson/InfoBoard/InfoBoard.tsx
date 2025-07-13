import Inquiry from "../Inquiry/Inquiry";
import Notice from "../Notice/Notice";
import * as S from "./styles";

export default function InfoBoard() {
  return (
    <S.Wrapper>
      <Notice />
      <Inquiry />
    </S.Wrapper>
  );
}