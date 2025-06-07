import styles from '@/shared/css/Home/Homework/NotSubmitted.module.css'
import { Posts } from './Theme';
import { Card } from './HomeworkCard';


export default function NotSubmitted(): React.ReactNode {
    return (
        <div className={styles.topContainer}>
            <div className={styles.container}>
                <h1>미제출 과제</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>기간안에 과제를 제출하세요!</p>
                </div>
                <div className={styles.cardContainer}>
                        {Posts.map((post, index) => (
                            <Card
                                key={index}
                                date={post.date}
                                body={post.body}
                                link={post.link}
                            />
                        ))}
                    </div>
            </div>
        </div>
    );
}
