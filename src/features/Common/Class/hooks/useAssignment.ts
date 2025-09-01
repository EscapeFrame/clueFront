import { useEffect, useState } from 'react';
import { Assignment, AssignmentAttachment } from '@/shared/types/Class/Assignment/Attachment';
import { AssignmentsApi } from '@/features/Common/Class/api/useAssignment';
import { AssignmentAttachmentApi } from '@/features/Common/Class/api/useAttachments';

export const useAssignments = (classId?: string) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!classId) return;

    const loadAssignments = async () => {
      try {
        const data = await AssignmentsApi.getAll(classId);

        const dataWithFiles = await Promise.all(
          data.map(async (assignment) => {
            let attachments: AssignmentAttachment[] = [];
            try {
              attachments = await AssignmentAttachmentApi.getAll(assignment.assignmentId);
            } catch {
              attachments = [];
            }

            return {
              id: assignment.assignmentId,
              title: assignment.title,
              description: assignment.content,
              deadline: assignment.endDate,
              isSubmitted: false,
              files: attachments.map(att => ({
                fileId: att.value,
                fileName: att.originalFileName || att.value,
                fileSize: att.size || 0,
              })),
            };
          })
        );

        setAssignments(dataWithFiles);
      } catch (err) {
        console.error('과제 불러오기 실패:', err);
        setError('과제를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, [classId]);

  return { assignments, loading, error };
};