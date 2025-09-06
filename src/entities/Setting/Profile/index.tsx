// Profile.tsx
import { useRecoilValue } from "recoil";
import { userState } from "@/shared/model/userState";
import * as S from './styles';

export function Profile() {
  const user = useRecoilValue(userState);

  const image = ''; // 일단 빈 이미지로 받아오도록 저장 추후 수정
  const name: string = user?.username || '이름';
  const school = '부산소프트웨어마이스터고등학교';
  const grade = 2;
  const classNumber = 2;
  const studentNumber = 1;

  return (
    <S.Container>
      <S.AvatarArea>
        {image ? <S.Avatar src={image} alt="User avatar" /> : <S.AvatarFallback />}
      </S.AvatarArea>
      <S.InfoArea>
        <S.Name>{name}</S.Name>
        <S.SubText>{school}</S.SubText>
        <S.SubText>{grade}학년 {classNumber}반 {studentNumber}번</S.SubText>
      </S.InfoArea>
    </S.Container>
  );
}
