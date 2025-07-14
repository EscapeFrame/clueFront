import { useNavigate } from 'react-router-dom';
import { type TPost } from '@/shared/theme/Teacher/MyClassTheme';
import * as S from './styles';

interface TClassCardProps extends TPost {}

export function TClassCard({ classId, title, subject, classRoom, people, status }: TClassCardProps) {
  const navigate = useNavigate();

  return (
    <S.CardContainer onClick={() => navigate(`/tclass/${classId}`)}>
      <S.CardHeader>
        <S.Status active={status === 1}>{status === 1 ? '활성화' : '비활성화'}</S.Status>
      </S.CardHeader>
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardInfo>{subject} | {classRoom}</S.CardInfo>
      <S.CardInfo>학생 {people}명</S.CardInfo>
      <S.ViewContainer>
        <S.ManageButton
          onClick={e => {
            e.stopPropagation();
            navigate(`/tclass/${classId}/manage`);
          }}
        >
          관리
        </S.ManageButton>
        <S.ViewButton
          onClick={e => {
            e.stopPropagation();
            navigate(`/tclass/${classId}`);
          }}
        >
          학습실 보기
        </S.ViewButton>
      </S.ViewContainer>
    </S.CardContainer>
  );
}