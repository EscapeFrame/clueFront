import styles from '@/shared/css/Home/Other/Other.module.css';
import Card from './OtherCard'
import contents from '@/shared/css/Home/Other/data';


export default function Other(): React.ReactNode {
    return (
        <div className={styles.topContainer}>
            <div className={styles.container}>
                <h1>학교 서비스로 바로가기</h1>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                    {contents.map((content) => (
                        <Card
                            href={content.href}
                            src={content.src}
                            homepage={content.homepage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
