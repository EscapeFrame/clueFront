import styles from '@/shared/css/Home/home.module.css';
import MySchedule from '@/features/MainComponent/Schedule/MySchedule';
import GoToClass from '@/features/MainComponent/Class/GoToClass';
import Navbar from '@/widgets/Navbar';
import NotSubmitted from '@/features/MainComponent/Homework/NotSubmitted';
import Announcement from '@/features/MainComponent/Announcement/Announcement';
import Other from '@/features/MainComponent/Other/Other';
import TeamFooter from '@/features/MainComponent/Footer/TeamFooter';

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