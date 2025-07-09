import { useState } from 'react';
import { AssignmentGroup as AssignmentGroupType } from '@/shared/theme/AssignmentTheme';
import { TAssignmentCard } from './TAssignmentCard';
import styles from '@/shared/css/Class/Assignment/Assignment.module.css';
import { useParams } from 'react-router-dom';
import TCheckStudent from './TCheckStudent';

export function TAssignmentGroup({ cards }: AssignmentGroupType) {
  const { classId } = useParams<{ classId: string }>();
  const [selectedLessonId, setSelectedLessonId] = useState<string | number | null>(null);

  if (selectedLessonId) {
    return <TCheckStudent classId={classId} lessonId={selectedLessonId} />;
  }

  return (
    <div className={styles.groupSection}>
      <div className={styles.cardGrid}>
        {cards.map(card => (
          <TAssignmentCard key={card.id} data={card} onCheck={() => setSelectedLessonId(card.id)} />
        ))}
      </div>
    </div>
  );
}