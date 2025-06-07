import styles from '@/shared/css/Home/home.module.css';
import MySchedule from '@/features/Main_component/Schedule/MySchedule';
import GoToClass from '@/features/Main_component/Class/GoToClass';
import Navbar from '@/widgets/Navbar';
import NotSubmitted from '@/features/Main_component/Homework/NotSubmitted';
import Announcement from '@/features/Main_component/Announcement/Announcement';
import Other from '@/features/Main_component/Other/Other';
import TeamFooter from '@/shared/Footer/TeamFooter';

export default function Home() {
    return (
        <div className={styles.container}>
            <Navbar />
            <MySchedule />
            <GoToClass />
            <NotSubmitted/>
            <Announcement />
            <Other />
            <TeamFooter />
        </div>
    );
}