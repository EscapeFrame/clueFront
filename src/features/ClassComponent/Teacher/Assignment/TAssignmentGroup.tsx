import React from 'react';
import { AssignmentGroup as AssignmentGroupType } from '@/shared/theme/AssignmentTheme';
import { TAssignmentCard } from './TAssignmentCard';
import styles from '@/shared/css/Class/Assignment/Assignment.module.css';

export function TAssignmentGroup({ cards }: AssignmentGroupType) {
  return (
    <div className={styles.groupSection}>
      <div className={styles.cardGrid}>
        {cards.map(card => (
          <TAssignmentCard key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
}