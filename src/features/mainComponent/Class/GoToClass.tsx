import styles from '@/shared/css/Home/Class/GoToClass.module.css'
import { useState } from 'react';
import { MiniCard } from './MiniCard';
import { Posts } from './Theme';
import { Card } from './Card';


export default function GoToClass() {
    const [isActive, setIsActive] = useState<number>(0);
    return (
        <div className={styles.topContainer}>
            <div className={styles.container}>
                <h1>학습실 바로가기</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>간편하게 수업에 함께 참여해 보세요!</p>
                    <p>더보기 &gt;</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <MiniCard
                            title="인문과목"
                            isActive={isActive === 0}
                            onClick={() => setIsActive(0)}
                        />
                        <MiniCard
                            title="전공과목"
                            isActive={isActive === 1}
                            onClick={() => setIsActive(1)}
                        />
                        <MiniCard
                            title="방과후"
                            isActive={isActive === 2}
                            onClick={() => setIsActive(2)}
                        />
                    </div>
                    <div className={styles.cardContainer}>
                        {Posts.map((post, index) => (
                            <Card
                                key={index}
                                tittle={post.tittle}
                                subject={post.subject}
                                classRoom={post.classRoom}
                                people={post.people}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
