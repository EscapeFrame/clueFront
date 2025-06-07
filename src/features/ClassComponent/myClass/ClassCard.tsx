import { useNavigate } from 'react-router-dom';
import styles from '@/shared/css/Class/MyClass/ClassList.module.css';

import { Posts, type Post } from '@/shared/theme/MyClassTheme';

export function ClassCard({ classId, title, subject, classRoom, people }: Post) {
  const navigate = useNavigate();

  return (
    <div
        className={styles.Card}
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/class/${classId}`)}
      >
        <h2 className={styles.ClassTittle}>{title}</h2>
        <p className={styles.ClassInform}>
          {subject} | {classRoom}
        </p>
        <p className={styles.ClassInform}>학생 {people}명</p>
        <p
          className={styles.GoToBtn}
          onClick={e => {
            e.stopPropagation();
            navigate(`/class/${classId}?view=과제`);
          }}
          style={{ cursor: 'pointer' }}
        >
          과제보기 &gt;
        </p>
      </div>
  );
}