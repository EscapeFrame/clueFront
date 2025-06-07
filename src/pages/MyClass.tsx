import styles from '@/shared/css/Class/MyClass/ClassList.module.css';
import { ClassList } from "@/features/ClassComponent/myClass/ClassList";
import Navbar from "@/widgets/Navbar";

export default function MyClass() {
    return (
        <>
            <Navbar />
            <div className={styles.body}>
                <h1 className={styles.TitleFont}>나의 학습실</h1>
                <ClassList />
            </div>
        </>
    );
}
