import React from 'react';
import { dummyDataGroups } from '@/shared/theme/AssignmentTheme';
import { AssignmentGroup } from './AssignmentGroup';
import styles from '@/shared/css/Class/Assignment/Assignment.module.css';

export function Assignment() {
  return (
    <div className={styles.container}>
      {dummyDataGroups.map((group, index) => (
        <AssignmentGroup key={index} cards={group.cards} />
      ))}
    </div>
  );
}