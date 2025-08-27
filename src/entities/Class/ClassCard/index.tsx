import { useNavigate } from 'react-router-dom';
import * as s from './styles';

interface ClassCardProps {
  classRoomId: number;
  name: string;
  sort: string;
  target: string;
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
      <s.Description>
        {sort} | {target}
      </s.Description>
      <s.GoToLink onClick={handleAssignmentClick}>과제보기</s.GoToLink>
    </s.Card>
  );
};