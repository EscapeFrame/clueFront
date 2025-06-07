import styles from '@/shared/css/Home/Schedule/TimeTable.module.css';
import axios, { AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import { scheduleState } from '@/shared/recoil/atoms';
import { useEffect, useState } from 'react';

export interface Subjects {
  [day: string]: string[];
};

// interface ClassRoom {
//   grade:number;
//   classNumber:number;
// }

const TableRow = ({ period, subjects }: { period: string; subjects: string[] }) => {
  return (
    <tr>
      <td className={styles.td_smaller}>{period}</td>
      {subjects.map((subject, index) => (
        <td key={index}>{subject}</td>
      ))}
    </tr>
  );
};
const TimeTable = () => {
  const addtion: string | null = '2201 공덕현'; // 학번 이름
  const periods: string[] = ['1교시', '2교시', '3교시', '4교시', '5교시', '6교시', '7교시'];

  const days: string[] = ['1', '2', '3', '4', '5'];

  const [schedule, setSchedule] = useRecoilState(scheduleState);
  const [loading, setLoading] = useState<boolean>(true);

  let studentNumber: number | null = null;
  let studentName: string = '';
  if (addtion) {
    const [studentNumbers, name] = addtion.split(" ")
    const studentNumber = parseInt(studentNumbers, 10);
    studentName = name;
  }

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6'; //임시로 아무거나 넣어놈
        const response: AxiosResponse<Subjects> = await axios.get('http://10.150.1.233:8080/api/schedules', {
          //로컬스토리지 저장하기
          params: {
            addtion,
          },
          // headers: {
          //   Authorization:`Bearer ${token}`, // Oauth 토큰받아오기
          // },
        });
        setSchedule(response.data)
        setLoading(false); // 로딩 완료
        console.log('서버 응답 확인', response.data)
      } catch (error) {
        console.error('시간표 불러오기 실패', error);
        setLoading(false); // 로딩 완료
      }
    };
    fetchSchedule();
  }, [addtion])

  const getSubjects = (periodIndex: number): string[] => {
    return days.map(day => schedule?.[day]?.[periodIndex] || '안들어옴');
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              {studentNumber ? `${Math.floor(studentNumber / 1000)}학년 ${studentNumber / 100 - (studentNumber / 1000) * 10}반` : '학번 없음'}
            </th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((period, index) => (
            <TableRow key={index} period={period} subjects={getSubjects(index)} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
