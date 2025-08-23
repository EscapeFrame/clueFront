import * as s from './styles';
import { useEffect, useState } from 'react';

import { QuickLink } from '@/features/Common/Main/QuickLink';
import PendingTask from '@/features/Common/Main/PendingTask';
import TaskGuide from '@/features/Common/Main/TaskGuide';
import Notice from '@/features/Common/Main/Notice';
import Footer from '@/widgets/Footer';
import { MySchedule } from '@/features/Common/Main/Schedule';
import { ScheduleItem } from '@/shared/types/schedule';
import Customapi from '@/shared/config/api';

const WeeklyTimetable = async (): Promise<ScheduleItem[] | number> => {
    try {
        const res = await Customapi.get('/api/timetable/weekly');
        if (res.status !== 200) return res.status; // 상태 코드 체크
        return res.data;
    } catch (error) {
        console.error('주간 시간표 조회 실패:', error);
        throw error;
    }
};

export default function Home() {
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

    useEffect(() => {
        WeeklyTimetable()
            .then((data) => {
                if (Array.isArray(data)) {
                    setSchedule(data); // 배열일 때만 상태에 넣음
                } else {
                    console.error('주간 시간표 조회 실패, 상태 코드:', data);
                }
            })
            .catch((err) => console.error('스케줄 로딩 실패:', err));
    }, []);

    return (
        <s.Container>
            <MySchedule data={schedule} />
            <TaskGuide />       {/* 수행평가 안내*/}
            <PendingTask />     {/* 미제출과제*/}
            <Notice />          {/* 공지/안내 */}
            {/* 성취도 분석(추후 추가예정) */}
            <QuickLink />       {/* 학교서비스바로가기 */}
            <Footer />
        </s.Container>
    );
}