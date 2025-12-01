import { useState } from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import { AssignmentCardProps } from '@/shared/types/Class/Assignment/Attachment';
import { AssignmentsApi } from '@/features/Common/Class/api/useAssignment';
import { IoClose } from 'react-icons/io5';
import { differenceInDays, parseISO } from 'date-fns';
import * as s from './styles';

export function AssignmentCard({ data, assignmentId, onAssignmentSelect, onDeleteSuccess }: AssignmentCardProps & {
  assignmentId: string;
  onAssignmentSelect: (assignmentId: string) => void;
  onDeleteSuccess?: () => void;
}) {
  const [isSubmitted] = useState(data.isSubmitted ?? false);
  const renderDeadlineOrSubmission = () => {
    if (isSubmitted) {
      return <s.InfoItem><LuClock4 /> 제출 시간: {data.submissionDate ?? '없음'}</s.InfoItem>;
    }

    if (!data.endDate || typeof data.endDate !== "string" || data.endDate.trim() === "") {
      return <s.InfoItem><LuClock4 /> 마감일 정보 없음</s.InfoItem>;
    }

    try {
      const parsed = parseISO(data.endDate);
      if (isNaN(parsed.getTime())) {
        return <s.InfoItem><LuClock4 /> 마감일 정보 오류</s.InfoItem>;
      }

      const daysLeft = differenceInDays(parsed, new Date());
      return <s.InfoItem><LuClock4 /> 마감까지 남은 일수: {daysLeft > 0 ? daysLeft : 0}일</s.InfoItem>;
    } catch (e) {
      console.error("Invalid deadline:", data.endDate, e);
      return <s.InfoItem><LuClock4 /> 마감일 정보 오류</s.InfoItem>;
    }
  };

  return (
    <s.CardContainer onClick={() => onAssignmentSelect(assignmentId)}>
      <s.CardHeader>
        <s.Title>{data.title}</s.Title>
        <s.FileRemoveButton
          onClick={async (e) => {
            e.stopPropagation();
            if (!window.confirm('정말로 이 과제를 삭제하시겠습니까?')) return;
            try {
              const result = await AssignmentsApi.delete(assignmentId);
              if (result) {
                alert('과제가 성공적으로 삭제되었습니다.');
                onDeleteSuccess?.();
              } else {
                alert('과제 삭제에 실패했습니다.');
              }
            } catch (error) {
              console.error('과제 삭제 중 오류 발생:', error);
              alert('과제 삭제 중 오류가 발생했습니다.');
            }
          }}
        >
          <s.DeleteIcon>
            <IoClose size={16} />
          </s.DeleteIcon>
        
        </s.FileRemoveButton>
      </s.CardHeader>

      <s.InfoSection>
        <s.InfoItem><IoCalendarClearOutline /> 마감일: {data.endDate}</s.InfoItem>
        {renderDeadlineOrSubmission()}
      </s.InfoSection>
    </s.CardContainer>
  );
}
