import styles from '@/shared/css/Class/Lesson/LessonCard.module.css';
import { Lessons } from '@/shared/theme/LessonTheme';

import LessonCard from './TLessonCard';
import InfoBoard from './TInfoBoard';

export default function TLesson() {
  return (
    <div className={styles.container}>
      <div className={styles.lessonCardWrapper}>
        <LessonCard sections={Lessons} />
      </div>
      <div className={styles.infoBoardWrapper}>
        <InfoBoard />
      </div>
    </div>
  );
}