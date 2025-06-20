import { dummyDataGroups } from '@/shared/theme/AssignmentTheme';
import { TAssignmentGroup } from './TAssignmentGroup';
import styles from '@/shared/css/Class/Assignment/Assignment.module.css';

export function TAssignment() {
  return (
    <div className={styles.container}>
      {dummyDataGroups.map((group, index) => (
        <TAssignmentGroup key={index} cards={group.cards} />
      ))}
    </div>
  );
}