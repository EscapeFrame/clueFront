import React from 'react';
import { LinkCard } from '@/linkSave/types/card';
import LinkCardItem from '../Card';
import * as S from '../Card/styles';

interface LinkCardListProps {
  cards: LinkCard[];
  activeCategory: string;
  onEdit: (card: LinkCard) => void;
  onDelete: (card: LinkCard) => void;
}

const LinkCardList: React.FC<LinkCardListProps> = ({ cards, activeCategory, onEdit, onDelete }) => {
  
  const filteredCards = activeCategory === '전체'
    ? cards
    : cards.filter(card => card.tags.includes(activeCategory));

  return (
    <S.CardGrid>
        {filteredCards.map(card => (
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