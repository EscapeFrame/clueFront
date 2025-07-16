import { Table, TdSmaller } from './TimeTable.styles';
import Customapi from '@/shared/api/axios';
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
      <TdSmaller>{period}</TdSmaller>
      {subjects.map((subject, index) => (
        <td key={index}>{subject}</td>
      ))}
    </tr>
  );
};
const TimeTable = () => {
  const addtion: string | null = '2201 공덕현'; // 학번 이름
  const grade = '1';
  const classNumber ='1';
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
        Customapi.get('/api/schedules', {
          params: {
            grade,
            classNumber
          }
        }).then(res => {
          setSchedule(res.data);
          setLoading(false); // 로딩 완료
          console.log('서버 응답 확인', res.data);
        }).catch (error => {
        console.error('시간표 불러오기 실패', error);
        setLoading(false); // 로딩 완료
      })
    };
    fetchSchedule();
  }, [])

  const getSubjects = (periodIndex: number): string[] => {
    return days.map(day => schedule?.[day]?.[periodIndex] || '안들어옴');
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Table>
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
      </Table>
    </div>
  );
};

export default TimeTable;
