// src/components/LinkCardItem.tsx

import React from 'react';
import { LinkCard } from '@/linkSave/types/card';
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
        <button onClick={() => onEdit(card.id)} aria-label="수정">
          ✏️ 
        </button>
        <button onClick={() => onDelete(card.id)} aria-label="삭제">
          🗑️ 
        </button>
      </S.CardHeader>
      
      <S.CardDate>{card.date}</S.CardDate>
      <S.CardTitle>{card.title}</S.CardTitle>
      <S.CardExplanation>{card.explanation}</S.CardExplanation>

      <S.CardTagContainer>
        {card.tags.map((tag, index) => (
          <S.CardTag key={index}>{tag}</S.CardTag>
        ))}
      </S.CardTagContainer>
    </S.CardContainer>
  );
};

export default LinkCardItem;