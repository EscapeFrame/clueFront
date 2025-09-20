import { useState } from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import { AssignmentCardProps } from '@/shared/types/Class/Assignment/Attachment';
import { differenceInDays, parseISO } from 'date-fns';
import Button from '@/entities/UI/Button';
import * as s from './styles';
import { useNavigate } from 'react-router-dom';

export function AssignmentCard({ data, assignmentId }: AssignmentCardProps & {
  assignmentId: string;
}) {
  const navigate = useNavigate();
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
    <s.CardContainer>
      <s.InfoSection>
        <s.Title>{data.title}</s.Title>
        <s.InfoItem><IoCalendarClearOutline /> 마감일: {data.endDate}</s.InfoItem>
        {renderDeadlineOrSubmission()}
      </s.InfoSection>

      {/* 제출현황 버튼 클릭 시 상세 페이지로 전환 */}
      <Button
        type={0}
        text="제출현황"
        onClick={() => navigate(`${assignmentId}/check`)}
      />
    </s.CardContainer>
  );
}
