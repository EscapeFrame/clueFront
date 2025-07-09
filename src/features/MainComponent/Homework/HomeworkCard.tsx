import styles from '@/shared/css/Home/Homework/HomeworkCard.module.css';
import { useNavigate } from 'react-router-dom';

interface CardType {
  date: number;
  body: string;
  link: string;
}

export function Card({ date, body, link }: CardType) {
  const navigate = useNavigate();
  const dayClass =
    date <= 7 ? 'before_week' : date <= 14 ? 'week' : 'after_week';

  return (
    <div className={styles.container}>
      <p className={styles[dayClass]}>D - {date}</p>
      <p>{body}</p>
      <p
        className={styles.homeSchool}
        onClick={() => navigate(link)}
        style={{ cursor: 'pointer' }}
      >
        제출 &gt;
      </p>
    </div>
  );
}
