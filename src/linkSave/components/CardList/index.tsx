import React from 'react';
import { LinkCard } from '@/linkSave/types/card';
import LinkCardItem from '../Card';
import * as S from '../Card/styles';

interface LinkCardListProps {
  cards: LinkCard[];
  onEdit: (card: LinkCard) => void;
  onDelete: (card: LinkCard) => void;
}

const LinkCardList: React.FC<LinkCardListProps> = ({ cards, onEdit, onDelete }) => {
  
  return (
    <S.CardGrid>
        {cards.map(card => (
            <LinkCardItem
                key={card.id}
                card={card}
                onEdit={() => onEdit(card)} // card 객체 전체를 전달
                onDelete={() => onDelete(card)} // card 객체 전체를 전달
            />
        ))}
    </S.CardGrid>
  );
};

export default LinkCardList;