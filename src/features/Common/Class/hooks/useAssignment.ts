import { useEffect, useState } from 'react';
import { 
  AssignmentResponse, 
  AssignmentUpdateRequest 
} from '@/shared/types/class/assignment/assignment';
import * as api from '../api/useAssignment';

export const useAssignments = (classRoomId: string) => {
  const [assignments, setAssignments] = useState<AssignmentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 과제 전체 조회
  const loadAssignments = async () => {
    setLoading(true);
    try {
      const data = await api.fetchAssignments(classRoomId);
      setAssignments(data);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || '과제 불러오기 실패');
    } finally {
      setLoading(false);
    }
  };

  // 과제 수정
  const modifyAssignment = async (assignmentId: number, changes: Partial<AssignmentResponse>) => {
    const existing = assignments.find(a => a.assignmentId === assignmentId);
    if (!existing) return;

    const payload: AssignmentUpdateRequest = {
      content: changes.content ?? existing.content,
      start_date: changes.startDate ?? existing.startDate,
      end_date: changes.endDate ?? existing.endDate,
      title: changes.title ?? existing.title,
    };

    try {
      const updated = await api.updateAssignment(assignmentId, payload);
      setAssignments(prev =>
        prev.map(a => (a.assignmentId === assignmentId ? updated : a))
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message || '과제 수정 실패');
    }
  };

  useEffect(() => {
    if (classRoomId) loadAssignments();
  }, [classRoomId]);

  return { assignments, loading, error, modifyAssignment };
};