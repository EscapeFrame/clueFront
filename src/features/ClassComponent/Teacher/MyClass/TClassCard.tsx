import { useNavigate } from 'react-router-dom';
import * as S from './styles';

interface TClassCardProps {
  classRoomId: string;
  name: string;
  sort: string;
  target: string;
  studentCount: number;
  isActivation: number;
}

export function TClassCard({ classRoomId, name, sort, target, studentCount, isActivation }: TClassCardProps) {
  const navigate = useNavigate();

  return (
    <S.CardContainer onClick={() => navigate(`/tclass/${classRoomId}/all`)}>
      <S.CardHeader>
        <S.Status active={isActivation === 1}>{isActivation === 1 ? '활성화' : '비활성화'}</S.Status>
      </S.CardHeader>
      <S.CardTitle>{name}</S.CardTitle>
      <S.CardInfo>{sort} | {target}</S.CardInfo>
      <S.CardInfo>학생 {studentCount}명</S.CardInfo>
      <S.ViewContainer>
        <S.ManageButton
          onClick={e => {
            e.stopPropagation();
            navigate(`/tclass/${classRoomId}/manage`);
          }}
        >
          관리
        </S.ManageButton>
        <S.ViewButton
          onClick={e => {
            e.stopPropagation();
            navigate(`/tclass/${classRoomId}`);
          }}
        >
          학습실 보기
        </S.ViewButton>
      </S.ViewContainer>
    </S.CardContainer>
  );
}