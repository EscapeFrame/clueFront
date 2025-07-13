import { useNavigate } from 'react-router-dom';
import type { Post } from '@/shared/theme/MyClassTheme';
import * as S from '@/features/ClassComponent/MyClass/styles';

export function ClassCard({ classId, title, subject, classRoom, people }: Post) {
  const navigate = useNavigate();

  return (
    <S.CardWrapper onClick={() => navigate(`/class/${classId}`)}>
      <S.ClassTitle>{title}</S.ClassTitle>
      <S.ClassInfo>{subject} | {classRoom}</S.ClassInfo>
      <S.ClassInfo>학생 {people}명</S.ClassInfo>
      <S.GoToBtn
        onClick={e => {
          e.stopPropagation();
          navigate(`/class/${classId}?view=과제`);
        }}
      >
        과제보기 &gt;
      </S.GoToBtn>
    </S.CardWrapper>
  );
}