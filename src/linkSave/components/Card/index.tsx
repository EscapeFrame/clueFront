import React from 'react';
import { LinkCard } from '@/linkSave/types/card';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoTrash } from "react-icons/go";
import * as S from './styles';

interface LinkCardItemProps {
  card: LinkCard;
  onEdit: () => void;
  onDelete: () => void;
}

const LinkCardItem: React.FC<LinkCardItemProps> = ({ card, onEdit, onDelete }) => {

  const handleCardClick = () => {
    window.open(card.link, '_blank', 'noopener,noreferrer');
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <S.CardContainer onClick={handleCardClick}>
      <S.CardHeader>
        <S.CardDate>{card.date}</S.CardDate>
        <S.CardActions>
          <S.EditButton onClick={handleEditClick}><HiOutlinePencilSquare /></S.EditButton>
          <S.DeleteButton onClick={handleDeleteClick}><GoTrash /></S.DeleteButton>
        </S.CardActions>
      </S.CardHeader>

      <S.CardContent>
        <S.CardTitle>{card.title}</S.CardTitle>
        <S.CardExplanation>{card.description}</S.CardExplanation>
      </S.CardContent>

      <S.CardTagContainer>
        {card.subjectType.map((subjectType, i) => <S.CardTag key={i}>{subjectType}</S.CardTag>)}
      </S.CardTagContainer>
    </S.CardContainer>
  );
};

export default LinkCardItem;