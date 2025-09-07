import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import { AssignmentCardProps } from '@/shared/types/Class/Assignment/Attachment';
import { differenceInDays, parseISO } from 'date-fns';
import Button from '@/entities/UI/Button';
import * as s from './styles';

export function AssignmentCard({ data, classRoomId }: AssignmentCardProps & { classRoomId: string }) {
  const [isSubmitted] = useState(data.isSubmitted);

  const navigate = useNavigate();
  const DetailAssignments = () => { // 제출현황 페이지로 이동
    navigate(`/class/${classRoomId}/check/${data.id}`);
  };

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
    <>
      <s.CardContainer>
        <s.InfoSection>
          <s.Title>{data.title}</s.Title>
          <s.InfoItem><IoCalendarClearOutline /> 마감일: {data.endDate}</s.InfoItem>
          {renderDeadlineOrSubmission()}
        </s.InfoSection>
        <Button type={0} text="제출현황" onClick={DetailAssignments} />
      </s.CardContainer>
    </>
  );
}