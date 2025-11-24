import { useState } from "react";
import styled from "@emotion/styled";
import {
  useQuizRoomsByHost,
  useCreateQuizRoom,
  useDeleteQuizRoom,
} from "@/entities/Quiz/api";
import { useAuth } from "@/app/hooks/useAccessToken";

interface TeacherQuizRoomListProps {
  onSelectRoom?: (roomCode: string) => void;
  onRoomCreated?: (roomCode: string) => void;
}

export default function TeacherQuizRoomList({
  onSelectRoom,
  onRoomCreated,
}: TeacherQuizRoomListProps) {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 내가 만든 방 목록 조회
  const { data: rooms, isLoading, error, refetch } = useQuizRoomsByHost(
    user.userId,
    {
      refetchInterval: 5000, // 5초마다 자동 갱신
    }
  );

  // 방 생성 mutation
  const { mutate: createRoom, isPending: isCreating } = useCreateQuizRoom({
    onSuccess: (response) => {
      alert(`퀴즈 방이 생성되었습니다! 코드: ${response.roomCode}`);
      setShowCreateModal(false);
      refetch();
      onRoomCreated?.(response.roomCode);
    },
    onError: (error) => {
      alert(`방 생성 실패: ${error.message}`);
    },
  });

  // 방 삭제 mutation
  const { mutate: deleteRoom } = useDeleteQuizRoom({
    onSuccess: () => {
      alert("퀴즈 방이 삭제되었습니다.");
      refetch();
    },
    onError: (error) => {
      alert(`방 삭제 실패: ${error.message}`);
    },
  });

  const handleCreateRoom = (formData: {
    title: string;
    maxParticipants: number;
    questionCount: number;
    timePerQuestion: number;
    classRoomId?: string;
    documentId?: string;
  }) => {
    createRoom(formData);
  };

  const handleDeleteRoom = (roomCode: string) => {
    if (confirm(`정말로 퀴즈 방 ${roomCode}을(를) 삭제하시겠습니까?`)) {
      deleteRoom(roomCode);
    }
  };

  if (isLoading) {
    return <LoadingContainer>내 퀴즈 방 목록을 불러오는 중...</LoadingContainer>;
  }

  if (error) {
    return (
      <ErrorContainer>
        <p>퀴즈 방 목록을 불러오는데 실패했습니다.</p>
        <RetryButton onClick={() => refetch()}>다시 시도</RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>내 퀴즈 방 관리</Title>
        <CreateButton onClick={() => setShowCreateModal(true)}>
          + 새 퀴즈 방 만들기
        </CreateButton>
      </Header>

      {(!rooms || rooms.length === 0) ? (
        <EmptyContainer>
          <EmptyIcon>📝</EmptyIcon>
          <EmptyText>아직 생성된 퀴즈 방이 없습니다.</EmptyText>
          <EmptySubText>새 퀴즈 방을 만들어 학생들과 함께해보세요!</EmptySubText>
        </EmptyContainer>
      ) : (
        <RoomGrid>
          {rooms.map((room) => (
            <RoomCard key={room.roomCode}>
              <RoomHeader>
                <RoomCode>{room.roomCode}</RoomCode>
                <StatusBadge status={room.status}>{room.status}</StatusBadge>
              </RoomHeader>

              <RoomTitle>{room.hostName}</RoomTitle>

              <RoomInfo>
                <InfoRow>
                  <InfoLabel>참가자</InfoLabel>
                  <InfoValue>
                    {room.currentParticipants} / {room.maxParticipants}명
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>문제 수</InfoLabel>
                  <InfoValue>{room.questionCount}개</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>시간</InfoLabel>
                  <InfoValue>{room.timePerQuestion}초/문제</InfoValue>
                </InfoRow>
              </RoomInfo>

              <CreatedAt>
                생성: {new Date(room.createdAt).toLocaleString("ko-KR")}
              </CreatedAt>

              <ButtonGroup>
                <ViewButton onClick={() => onSelectRoom?.(room.roomCode)}>
                  상세보기
                </ViewButton>
                <DeleteButton onClick={() => handleDeleteRoom(room.roomCode)}>
                  삭제
                </DeleteButton>
              </ButtonGroup>
            </RoomCard>
          ))}
        </RoomGrid>
      )}

      {showCreateModal && (
        <CreateRoomModal
          isCreating={isCreating}
          onSubmit={handleCreateRoom}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </Container>
  );
}

// 방 생성 모달 컴포넌트
interface CreateRoomModalProps {
  isCreating: boolean;
  onSubmit: (data: {
    title: string;
    maxParticipants: number;
    questionCount: number;
    timePerQuestion: number;
    classRoomId?: string;
    documentId?: string;
  }) => void;
  onClose: () => void;
}

function CreateRoomModal({ isCreating, onSubmit, onClose }: CreateRoomModalProps) {
  const [title, setTitle] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(30);
  const [questionCount, setQuestionCount] = useState(10);
  const [timePerQuestion, setTimePerQuestion] = useState(30);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("퀴즈 제목을 입력해주세요.");
      return;
    }

    onSubmit({
      title,
      maxParticipants,
      questionCount,
      timePerQuestion,
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>새 퀴즈 방 만들기</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label>퀴즈 제목 *</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 1학기 중간고사 대비 퀴즈"
            />
          </FormGroup>

          <FormGroup>
            <Label>최대 참가자 수</Label>
            <Input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              min={1}
              max={100}
            />
          </FormGroup>

          <FormGroup>
            <Label>문제 수</Label>
            <Input
              type="number"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              min={1}
              max={50}
            />
          </FormGroup>

          <FormGroup>
            <Label>문제당 제한 시간 (초)</Label>
            <Input
              type="number"
              value={timePerQuestion}
              onChange={(e) => setTimePerQuestion(Number(e.target.value))}
              min={10}
              max={300}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={onClose} disabled={isCreating}>
            취소
          </CancelButton>
          <SubmitButton onClick={handleSubmit} disabled={isCreating}>
            {isCreating ? "생성 중..." : "방 만들기"}
          </SubmitButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

// Styled Components
const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
`;

const CreateButton = styled.button`
  padding: 12px 24px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

const RoomCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 12px;
`;

const RoomCode = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #2563eb;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => {
    switch (props.status.toLowerCase()) {
      case "waiting":
        return "#fef3c7";
      case "active":
      case "in_progress":
        return "#dcfce7";
      case "finished":
        return "#e5e7eb";
      default:
        return "#f3f4f6";
    }
  }};
  color: ${(props) => {
    switch (props.status.toLowerCase()) {
      case "waiting":
        return "#92400e";
      case "active":
      case "in_progress":
        return "#166534";
      case "finished":
        return "#6b7280";
      default:
        return "#4b5563";
    }
  }};
`;

const RoomTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const InfoLabel = styled.span`
  color: #6b7280;
`;

const InfoValue = styled.span`
  font-weight: 500;
  color: #1f2937;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  color: #9ca3af;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  margin-bottom: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ViewButton = styled.button`
  flex: 1;
  padding: 8px;
  background: #f3f4f6;
  color: #1f2937;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  padding: 8px;
  background: #fef2f2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #fee2e2;
  }
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

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: #f9fafb;
  border-radius: 12px;
  border: 2px dashed #d1d5db;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 8px;
`;

const EmptySubText = styled.div`
  font-size: 14px;
  color: #9ca3af;
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6b7280;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 10px;
  background: #f3f4f6;
  color: #4b5563;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #e5e7eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 10px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
