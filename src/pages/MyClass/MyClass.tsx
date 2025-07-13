import { ClassList } from "@/features/ClassComponent/MyClass/ClassList";
import * as S from './styles';

export default function MyClass() {
  return (
    <S.Body>
      <S.TitleFont>나의 학습실</S.TitleFont>
      <ClassList />
    </S.Body>
  );
}