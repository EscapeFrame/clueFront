import { useQuizRoom } from "@/entities/Quiz/api";
import styled from "@emotion/styled";
import { useEffect } from "react";

interface QuizRoomDetailProps {
  roomCode: string;
  onClose?: () => void;
}

export default function QuizRoomDetail({ roomCode, onClose }: QuizRoomDetailProps) {
  const { data: room, isLoading, error, refetch } = useQuizRoom(roomCode, {
    refetchInterval: 3000, // 3초마다 자동 갱신
    enabled: !!roomCode,
  });

  useEffect(() => {
    if (roomCode) {
      refetch();
    }
  }, [roomCode, refetch]);

  if (isLoading) {
    return <LoadingContainer>퀴즈 방 정보를 불러오는 중...</LoadingContainer>;
  }

  if (error) {
    return (
      <ErrorContainer>
        <p>퀴즈 방 정보를 불러오는데 실패했습니다.</p>
        <RetryButton onClick={() => refetch()}>다시 시도</RetryButton>
        {onClose && <CloseButton onClick={onClose}>닫기</CloseButton>}
      </ErrorContainer>
    );
  }

  if (!room) {
    return <EmptyContainer>퀴즈 방을 찾을 수 없습니다.</EmptyContainer>;
  }

  return (
    <Container>
      <Header>
        <Title>퀴즈 방 상세 정보</Title>
        {onClose && <CloseButton onClick={onClose}>✕</CloseButton>}
      </Header>

      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <Label>방 코드</Label>
            <Value>{room.roomCode}</Value>
          </InfoItem>
          <InfoItem>
            <Label>호스트</Label>
            <Value>{room.hostName}</Value>
          </InfoItem>
          <InfoItem>
            <Label>상태</Label>
            <StatusBadge status={room.status}>{room.status}</StatusBadge>
          </InfoItem>
          <InfoItem>
            <Label>참가자</Label>
            <Value>
              {room.currentParticipants} / {room.maxParticipants}
            </Value>
          </InfoItem>
          <InfoItem>
            <Label>문제 수</Label>
            <Value>{room.questionCount}개</Value>
          </InfoItem>
          <InfoItem>
            <Label>문제당 시간</Label>
            <Value>{room.timePerQuestion}초</Value>
          </InfoItem>
        </InfoGrid>
      </Section>

      <Section>
        <SectionTitle>참가자 목록 ({room.participants.length}명)</SectionTitle>
        {room.participants.length === 0 ? (
          <EmptyParticipants>아직 참가자가 없습니다.</EmptyParticipants>
        ) : (
          <ParticipantList>
            {room.participants.map((participant) => (
              <ParticipantCard key={participant.userId}>
                <ParticipantName>{participant.username}</ParticipantName>
                <ParticipantInfo>
                  <span>점수: {participant.score}</span>
                  <span>정답: {participant.correctAnswers}</span>
                  {participant.isReady && <ReadyBadge>준비완료</ReadyBadge>}
                </ParticipantInfo>
              </ParticipantCard>
            ))}
          </ParticipantList>
        )}
      </Section>

      <Section>
        <SectionTitle>시간 정보</SectionTitle>
        <TimeInfo>
          <TimeItem>
            <Label>생성 시간</Label>
            <Value>{new Date(room.createdAt).toLocaleString('ko-KR')}</Value>
          </TimeItem>
          {room.startedAt && (
            <TimeItem>
              <Label>시작 시간</Label>
              <Value>{new Date(room.startedAt).toLocaleString('ko-KR')}</Value>
            </TimeItem>
          )}
          {room.finishedAt && (
            <TimeItem>
              <Label>종료 시간</Label>
              <Value>{new Date(room.finishedAt).toLocaleString('ko-KR')}</Value>
            </TimeItem>
          )}
        </TimeInfo>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

const Value = styled.span`
  font-size: 16px;
  color: #1f2937;
  font-weight: 600;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  width: fit-content;
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

const ParticipantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ParticipantCard = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ParticipantName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

const ParticipantInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
`;

const ReadyBadge = styled.span`
  background: #dcfce7;
  color: #166534;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const EmptyParticipants = styled.div`
  text-align: center;
  padding: 24px;
  color: #9ca3af;
  font-size: 14px;
`;

const TimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TimeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
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
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: #1d4ed8;
  }
`;

const CloseButton = styled.button`
  padding: 8px 16px;
  background: #f3f4f6;
  color: #4b5563;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: #e5e7eb;
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
