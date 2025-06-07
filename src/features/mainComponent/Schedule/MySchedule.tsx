import styles from '@/shared/css/Home/Schedule/main.module.css';
import TimeTable from './TimeTable';
import Demo from './TimeLine';

export default function MySchedule() {
    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.font}>
                    나의 일과알아보기
                </h1>
                <p>빠르게 나의 수업을 확인하세요</p>
            </div>
            <div className={styles.side_by_side}>
                <div style={{overflow:'hidden'}}>
                    <h2>시간표</h2>
                    <TimeTable />
                </div>
                <div className={styles.timeLine_side}>
                    <p>학습 타임라인</p>
                    <Demo />
                </div>
            </div>
        </div>
    )
}