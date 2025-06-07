import styles from '@/shared/css/Home/Class/Card.module.css'

interface CardProps {
  tittle: string;
  subject: string;
  classRoom: string;
  people: number
}

export function Card({ tittle, subject, classRoom, people }: CardProps) {
  return (
    <div className={styles.container}>
        <h2>{tittle}</h2>
        <p>{subject} | {classRoom}</p>
        <p>학생{people}명</p>
        <p className={styles.homeSchool}>과제보기 &gt;</p>
    </div>
  );
}