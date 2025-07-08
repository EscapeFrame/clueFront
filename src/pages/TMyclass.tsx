import styles from '@/shared/css/Class/MyClass/ClassList.module.css';
import { TClassList } from '@/features/ClassComponent/Teacher/MyClass/TClassList';
import Navbar from "@/widgets/Navbar";

export default function TMyClass() {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.TitleContainer}>
                    <h1 className={styles.TitleFont}>나의 학습실</h1>
                    <div className={styles.plus}> + 새학습실 만들기</div>
                </div>
                <p>학습실을 확인하고 관리하세요!</p>
                <TClassList />
            </div>
        </>
    );
}
