import React from 'react';
import { LinkCard } from '@/linkSave/types/card';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoTrash } from "react-icons/go";
import * as S from './styles';

interface LinkCardItemProps {
  card: LinkCard;
  onEdit: (cardId: string) => void;
  onDelete: (cardId: string) => void;
}

const LinkCardItem: React.FC<LinkCardItemProps> = ({ card, onEdit, onDelete }) => {
  return (
    <S.CardContainer>
      <S.CardHeader>
        <S.CardDate>{card.date}</S.CardDate>
        <S.CardActions>
          <S.EditButton onClick={() => onEdit(card.id)}><HiOutlinePencilSquare /></S.EditButton>
          <S.DeleteButton onClick={() => onDelete(card.id)}><GoTrash /></S.DeleteButton>
        </S.CardActions>
      </S.CardHeader>

      <S.CardContent>
        <S.CardTitle>{card.title}</S.CardTitle>
        <S.CardExplanation>{card.explanation}</S.CardExplanation>
      </S.CardContent>

      <S.CardTagContainer>
        {card.tags.map((tag, i) => <S.CardTag key={i}>{tag}</S.CardTag>)}
      </S.CardTagContainer>
    </S.CardContainer>
  );
};

export default LinkCardItem;