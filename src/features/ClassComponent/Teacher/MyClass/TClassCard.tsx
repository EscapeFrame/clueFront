import { useNavigate } from 'react-router-dom';
import styles from '@/shared/css/Class/MyClass/ClassList.module.css';
import { type TPost } from '@/shared/theme/Teacher/MyClassTheme';

export function TClassCard({ classId, title, subject, classRoom, people, status }: TPost) {
  const navigate = useNavigate();

  return (
    <div className={styles.tCard}>
      <div className={styles.ClassCard}>
        <p className={`${styles.status} ${status === 1 ? styles.active : styles.inactive}`}>
          {status === 1 ? '활성화' : '비활성화'}
        </p>
      </div>
      <h2 className={styles.ClassTittle}>{title}</h2>
      <p className={styles.ClassInform}>
        {subject} | {classRoom}
      </p>
      <p className={styles.ClassInform}>학생 {people}명</p>

      <div className={styles.viewContainer}>
        <div
          className={styles.manage}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/tclass/${classId}/manage`);
          }}
        >
          관리
        </div>
        <div
          className={styles.view}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/tclass/${classId}`);
          }}
        >
          학습실 보기
        </div>
      </div>
    </div>
  );
}