import { Container } from './Home.styles';
import MySchedule from '@/features/MainComponent/Schedule/MySchedule';
import GoToClass from '@/features/MainComponent/Class/GoToClass';
import NotSubmitted from '@/features/MainComponent/Homework/NotSubmitted';
import Announcement from '@/features/MainComponent/Announcement/Announcement';
import Other from '@/features/MainComponent/Other/Other';
import TeamFooter from '@/features/MainComponent/Footer/TeamFooter';

export default function Home() {
    return (
        <Container>
            <MySchedule />
            <GoToClass />
            <NotSubmitted/>
            <Announcement />
            <Other />
            <TeamFooter />
        </Container>
    );
}