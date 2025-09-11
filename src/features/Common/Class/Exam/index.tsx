import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as s from './styles';
import { ExamApi } from '../useExam';
import { Exam } from '@/shared/types/Class/Exam';

export const ExamComponent: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadExams = async () => {
      try {
        if (!classId) throw new Error('classId가 없습니다.');
        const data = await ExamApi(classId);
        setExams(data);
      } catch (err: any) {
        console.error('시험 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    if (classId) loadExams();
  }, [classId]);

  return (
    <s.Container>
      {exams.length === 0 ? (
        <s.Text>현재 등록된 시험이 없습니다.</s.Text>
      ) : (
        exams.map((exam) => (
          <s.Text key={exam.id}>
            {exam.title} ({exam.date})
          </s.Text>
        ))
      )}
    </s.Container>
  );
};