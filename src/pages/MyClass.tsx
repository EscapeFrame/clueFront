import styles from '@/shared/css/Class/MyClass/ClassList.module.css';
import { ClassList } from "@/features/ClassComponent/MyClass/ClassList";

export default function MyClass() {
    return (
        <>
            <div className={styles.body}>
                <h1 className={styles.TitleFont}>나의 학습실</h1>
                <ClassList />
            </div>
        </>
    );
}
