import { useNavigate } from 'react-router-dom';
import type { Post } from '@/shared/theme/MyClassTheme';
import * as S from '@/features/ClassComponent/MyClass/styles';

export function ClassCard({ classRoomId, name, sort, target, studentCount, isActivation }: Post) {
  const navigate = useNavigate();

  return (
    <S.CardWrapper onClick={() => navigate(`/class/${classRoomId}`)}>
      <S.ClassTitle>{name}</S.ClassTitle>
      <S.ClassInfo>{sort} | {target}</S.ClassInfo>
      <S.ClassInfo>학생 {studentCount}명</S.ClassInfo>
      <S.GoToBtn
        onClick={e => {
          e.stopPropagation();
          navigate(`/class/${classRoomId}?view=과제`);
        }}
      >
        과제보기 &gt;
      </S.GoToBtn>
    </S.CardWrapper>
  );
}