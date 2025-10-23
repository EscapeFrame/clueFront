import { useNavigate } from 'react-router-dom';
import { ClassPost } from '@/shared/types/Class/classroom';
import * as s from './styles';

interface ClassCardProps extends ClassPost {
  classRoomId: string;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  classRoomId, name, sort, target
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/class/${classRoomId}`);
  };

  const handleAssignmentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 방지
    navigate(`/class/${classRoomId}/assignment`);
  };

  return (
    <s.Card onClick={handleCardClick}>
      <s.Title>{name}</s.Title>
      <s.Description>{sort} | {target}</s.Description>
      <s.GoToLink onClick={handleAssignmentClick}>과제보기</s.GoToLink>
    </s.Card>
  );
};