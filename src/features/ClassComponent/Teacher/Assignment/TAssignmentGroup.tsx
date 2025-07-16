/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { TAssignmentCard } from './TAssignmentCard';
import { useParams } from 'react-router-dom';
import TCheckStudent from './TCheckStudent';
import {Button, GroupSection, CardGrid} from '@/features/ClassComponent/Assignment/styles';
import { AssignmentType } from '@/shared/types/Assignment';
import { AssignmentData } from '@/shared/theme/AssignmentTheme';

export function TAssignmentGroup({ cards }: { cards: AssignmentType[] }) {
  const { classId } = useParams<{ classId: string }>();
  const [selectedLessonId, setSelectedLessonId] = useState<string | number | null>(null);

  if (selectedLessonId) {
    return (
      <div>
        <Button onClick={() => setSelectedLessonId(null)}>← 뒤로가기</Button>
        <TCheckStudent classId={classId} lessonId={selectedLessonId} />
      </div>
    );
  }

  return (
    <GroupSection>
      <CardGrid>
        {cards.map(card => {
          // AssignmentType -> AssignmentData 변환
          const data: AssignmentData = {
            id: card.assignmentId,
            title: card.title,
            status: '미제출', // 실제 상태값 필요시 수정
            statusColor: 'bg-blue-500', // 실제 색상값 필요시 수정
            deadline: card.endDate,
            timeLeft: card.duringDate,
            timeLeftColor: 'text-blue-500', // 실제 값 필요시 수정
            fileName: card.files[0]?.fileName,
            fileSize: card.files[0] ? `${card.files[0].fileSize} MB` : undefined,
            hasFile: card.files.length > 0,
            buttonText: card.files.length > 0 ? '다시 제출하기' : '과제 제출하기',
            buttonType: card.files.length > 0 ? 'resubmit' : 'submit',
            classId: classId ?? '',
            homeworkId: String(card.assignmentId),
            people: 0, // 필요시 실제 인원수로 대체
            description: '', // 필요시 실제 설명으로 대체
          };
          return (
            <TAssignmentCard key={card.assignmentId} data={data} onCheck={() => setSelectedLessonId(card.assignmentId)} />
          );
        })}
      </CardGrid>
    </GroupSection>
  );
}
