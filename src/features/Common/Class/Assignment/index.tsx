import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AssignmentCard } from '@/entities/Class/AssignmentCard/Student';
import { SubmissionsApi } from '../api/useSubmissions';
import { StudentSubmission } from '@/shared/types/submission';
import * as s from './styles';
import { StudentAssignmentData, SubmissionAttachmentResponse } from '@/entities/Class/AssignmentCard/Student'; // Import necessary types

export const AssignmentComponent: React.FC = () => {
  const { classId, classRoomId } = useParams<{ classId?: string; classRoomId?: string }>();
  const effectiveId = classId ?? classRoomId;

  const [assignmentList, setAssignmentList] = useState<StudentAssignmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트 마운트 시(또는 effectiveId가 바뀔 때) 과제 목록 API 호출
  useEffect(() => {
    if (!effectiveId) {
      setLoading(false);
      setAssignmentList([]);
      return;
    }

    setLoading(true);
    SubmissionsApi.getAllForStudent(effectiveId)
      .then((data: StudentSubmission[]) => {
        const assignments: StudentAssignmentData[] = data.map(s => ({
          assignmentId: s.submissionId, // Use s.submissionId directly (it's already string)
          title: s.title,
          content: s.content,
          startDate: s.startDate, // Use s.startDate directly
          endDate: s.endDate,
          submissionId: s.submissionId, // Use s.submissionId directly (it's already string)
          IsSubmitted: s.IsSubmitted,
          submittedAt: s.submittedAt,
          submissionAttachmentResponses: s.submissionAttachmentResponses.map(f => ({
            submissionAttachmentId: f.submissionAttachmentId,
            type: f.type === 'FILE' ? 'FILE' : 'LINK', // Ensure type is 'FILE' or 'LINK'
            value: f.value,
            originalFileName: f.originalFileName,
          })),
        }));
        setAssignmentList(assignments);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("과제를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [effectiveId]);

  // 특정 과제 수정 함수
  const updateAssignment = (id: string, changes: Partial<StudentAssignmentData>) => { // Changed id type to string and changes type to Partial<StudentAssignmentData>
    setAssignmentList(prev =>
      prev.map(a => (a.assignmentId === id ? { ...a, ...changes } : a))
    );
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <s.Container>
      <s.Grid>
        {assignmentList.map(a => (
          <AssignmentCard
            key={a.assignmentId}
            data={a}
            updateAssignment={updateAssignment}
          />
        ))}
      </s.Grid>
    </s.Container>
  );
};