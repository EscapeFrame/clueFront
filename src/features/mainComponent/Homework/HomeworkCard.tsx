import styles from '@/shared/css/Home/Homework/HomeworkCard.module.css';
import { useNavigate } from 'react-router-dom'; // ✅ React Router용 hook

interface CardType {
  date: number;
  body: string;
  link: string;
}

export function Card({ date, body, link }: CardType) {
  const navigate = useNavigate(); // ✅ useRouter 대신 useNavigate 사용
  const dayClass =
    date <= 7 ? 'before_week' : date <= 14 ? 'week' : 'after_week';

  return (
    <div className={styles.container}>
      <p className={styles[dayClass]}>D - {date}</p>
      <p>{body}</p>
      <p
        className={styles.homeSchool}
        onClick={() => navigate(link)} // ✅ 페이지 이동
        style={{ cursor: 'pointer' }} // UX 향상
      >
        제출 &gt;
      </p>
    </div>
  );
}
