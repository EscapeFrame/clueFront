import * as S from './styles';
import { TClassList } from '@/features/ClassComponent/Teacher/MyClass/TClassList';

export default function TMyClass() {
  return (
    <S.Body>
      <S.TitleContainer>
        <S.TitleFont>나의 학습실</S.TitleFont>
        <S.Plus> + 새학습실 만들기</S.Plus>
      </S.TitleContainer>
      <p>학습실을 확인하고 관리하세요!</p>
      <TClassList />
    </S.Body>
  );
}
