import React from 'react';
import { AssignmentGroup as AssignmentGroupType } from '@/shared/theme/AssignmentTheme';
import { AssignmentCard } from './AssignmentCard';
import styles from '@/shared/css/Class/Assignment/Assignment.module.css';

export function AssignmentGroup({ cards }: AssignmentGroupType) {
  return (
    <div className={styles.groupSection}>
      <div className={styles.cardGrid}>
        {cards.map(card => (
          <AssignmentCard key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
}