import { Container, Font, SideBySide, TimeLineSide } from './Schedule.styles';
import TimeTable from './timeTable/TimeTable';
import Demo from './timeLine/TimeLine';

export default function MySchedule() {
    return (
        <Container>
            <div>
                <Font>
                    나의 일과알아보기
                </Font>
                <p>빠르게 나의 수업을 확인하세요</p>
            </div>
            <SideBySide>
                <div style={{overflow:'hidden'}}>
                    <h2>시간표</h2>
                    <TimeTable />
                </div>
                <TimeLineSide>
                    <p>학습 타임라인</p>
                    <Demo />
                </TimeLineSide>
            </SideBySide>
        </Container>
    )
}