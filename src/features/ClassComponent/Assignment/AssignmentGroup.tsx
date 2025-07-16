import { AssignmentCard } from './AssignmentCard';
import { GroupSection, CardGrid } from '@/features/ClassComponent/Assignment/styles';

export interface AssignmentFile {
  fileId: number;         // 파일 ID
  fileName: string;       // 원본 파일 이름
  fileSize: number;       // 파일 크기 (MB 단위)
}

// 과제 타입
export interface Assignment {    // 과제 ID
  assignmentId : number;
  title: string;              // 과제 제목  
  startDate: string;
  endDate: string;            // 마감일 (ISO-8601 권장)
  duringDate: string;         // 남은 기간 (DDHH)
  files: AssignmentFile[];    // 첨부 파일 리스트
}

export function AssignmentGroup({ cards }: { cards: Assignment[] }) {
  return (
    <GroupSection>
      <CardGrid>
        {cards.map((card, idx) => (
          <AssignmentCard key={card.files[0]?.fileId ?? idx} data={card} />
        ))}
      </CardGrid>
    </GroupSection>
  );
}