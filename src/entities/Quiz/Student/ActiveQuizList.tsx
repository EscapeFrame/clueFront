import { useActiveQuizRooms } from "@/entities/Quiz/api";
import styled from "@emotion/styled";

interface ActiveQuizListProps {
  onSelectRoom: (roomCode: string) => void;
}

export default function ActiveQuizList({ onSelectRoom }: ActiveQuizListProps) {
  const { data: rooms, isLoading, error, refetch } = useActiveQuizRooms({
    refetchInterval: 5000, // 5초마다 자동 갱신
  });

  if (isLoading) {
    return <LoadingContainer>활성 퀴즈 방을 불러오는 중...</LoadingContainer>;
  }

  if (error) {
    return (
      <ErrorContainer>
        <p>퀴즈 방 목록을 불러오는데 실패했습니다.</p>
        <RetryButton onClick={() => refetch()}>다시 시도</RetryButton>
      </ErrorContainer>
    );
  }

  if (!rooms || rooms.length === 0) {
    return <EmptyContainer>현재 활성화된 퀴즈 방이 없습니다.</EmptyContainer>;
  }

  return (
    <Container>
      <Title>활성 퀴즈 방 목록</Title>
      <RoomList>
        {rooms.map((room) => (
          <RoomCard key={room.roomCode} onClick={() => onSelectRoom(room.roomCode)}>
            <RoomHeader>
              <RoomCode>{room.roomCode}</RoomCode>
              <Status status={room.status}>{room.status}</Status>
            </RoomHeader>
            <RoomInfo>
              <InfoItem>
                <Label>호스트:</Label>
                <Value>{room.hostName}</Value>
              </InfoItem>
              <InfoItem>
                <Label>참가자:</Label>
                <Value>
                  {room.currentParticipants} / {room.maxParticipants}
                </Value>
              </InfoItem>
              <InfoItem>
                <Label>문제 수:</Label>
                <Value>{room.questionCount}개</Value>
              </InfoItem>
              <InfoItem>
                <Label>시간:</Label>
                <Value>{room.timePerQuestion}초/문제</Value>
              </InfoItem>
            </RoomInfo>
            <CreatedAt>
              생성: {new Date(room.createdAt).toLocaleString('ko-KR')}
            </CreatedAt>
          </RoomCard>
        ))}
      </RoomList>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const RoomList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const RoomCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const RoomCode = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #2563eb;
`;

const Status = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => {
    switch (props.status.toLowerCase()) {
      case 'waiting':
        return '#fef3c7';
      case 'active':
      case 'in_progress':
        return '#dcfce7';
      case 'finished':
        return '#e5e7eb';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${(props) => {
    switch (props.status.toLowerCase()) {
      case 'waiting':
        return '#92400e';
      case 'active':
      case 'in_progress':
        return '#166534';
      case 'finished':
        return '#6b7280';
      default:
        return '#4b5563';
    }
  }};
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Label = styled.span`
  color: #6b7280;
`;

const Value = styled.span`
  font-weight: 500;
  color: #1f2937;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-size: 16px;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  gap: 16px;

  p {
    font-size: 16px;
    color: #ef4444;
  }
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #1d4ed8;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-size: 16px;
  color: #6b7280;
`;
