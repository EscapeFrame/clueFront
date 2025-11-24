import { useState } from "react";
import styled from "@emotion/styled";
import ActiveQuizList from "@/entities/Quiz/Student/ActiveQuizList";
import QuizRoomDetail from "@/entities/Quiz/Teacher/QuizRoomDetail";
import {
  useQuizRoomsByHost,
  useQuizRoomsByClassroom,
} from "@/entities/Quiz/api";

/**
 * 퀴즈 REST API 테스트 페이지
 * 
 * 사용 방법:
 * 1. 활성 퀴즈 방 목록을 확인
 * 2. 방 코드를 클릭하면 상세 정보 확인
 * 3. 호스트 ID나 클래스룸 ID로 필터링된 방 목록 확인
 */
export default function QuizApiTest() {
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>("");
  const [hostId, setHostId] = useState<string>("");
  const [classRoomId, setClassRoomId] = useState<string>("");
  const [showHostRooms, setShowHostRooms] = useState(false);
  const [showClassroomRooms, setShowClassroomRooms] = useState(false);

  // 호스트별 방 목록 조회
  const { data: hostRooms, isLoading: hostLoading } = useQuizRoomsByHost(
    hostId,
    {
      enabled: showHostRooms && !!hostId,
    }
  );

  // 클래스룸별 방 목록 조회
  const { data: classroomRooms, isLoading: classroomLoading } =
    useQuizRoomsByClassroom(classRoomId, {
      enabled: showClassroomRooms && !!classRoomId,
    });

  return (
    <Container>
      <Header>
        <Title>퀴즈 REST API 테스트</Title>
        <Description>
          퀴즈 방 관련 REST API 기능을 테스트할 수 있는 페이지입니다.
        </Description>
      </Header>

      <Content>
        <Section>
          <SectionTitle>활성 퀴즈 방 목록</SectionTitle>
          <ActiveQuizList
            onSelectRoom={(code) => {
              setSelectedRoomCode(code);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </Section>

        {selectedRoomCode && (
          <Section>
            <SectionTitle>선택된 방 상세 정보</SectionTitle>
            <QuizRoomDetail
              roomCode={selectedRoomCode}
              onClose={() => setSelectedRoomCode("")}
            />
          </Section>
        )}

        <Section>
          <SectionTitle>호스트별 방 조회</SectionTitle>
          <FilterContainer>
            <Input
              type="text"
              placeholder="호스트 ID (UUID) 입력"
              value={hostId}
              onChange={(e) => setHostId(e.target.value)}
            />
            <Button
              onClick={() => setShowHostRooms(true)}
              disabled={!hostId}
            >
              조회
            </Button>
          </FilterContainer>
          {showHostRooms && hostLoading && <Loading>불러오는 중...</Loading>}
          {showHostRooms && hostRooms && (
            <ResultContainer>
              {hostRooms.length === 0 ? (
                <EmptyResult>해당 호스트의 방이 없습니다.</EmptyResult>
              ) : (
                <RoomGrid>
                  {hostRooms.map((room) => (
                    <RoomCard
                      key={room.roomCode}
                      onClick={() => setSelectedRoomCode(room.roomCode)}
                    >
                      <RoomCode>{room.roomCode}</RoomCode>
                      <RoomInfo>
                        <div>{room.hostName}</div>
                        <div>
                          {room.currentParticipants}/{room.maxParticipants}명
                        </div>
                        <StatusBadge status={room.status}>
                          {room.status}
                        </StatusBadge>
                      </RoomInfo>
                    </RoomCard>
                  ))}
                </RoomGrid>
              )}
            </ResultContainer>
          )}
        </Section>

        <Section>
          <SectionTitle>클래스룸별 방 조회</SectionTitle>
          <FilterContainer>
            <Input
              type="text"
              placeholder="클래스룸 ID 입력"
              value={classRoomId}
              onChange={(e) => setClassRoomId(e.target.value)}
            />
            <Button
              onClick={() => setShowClassroomRooms(true)}
              disabled={!classRoomId}
            >
              조회
            </Button>
          </FilterContainer>
          {showClassroomRooms && classroomLoading && (
            <Loading>불러오는 중...</Loading>
          )}
          {showClassroomRooms && classroomRooms && (
            <ResultContainer>
              {classroomRooms.length === 0 ? (
                <EmptyResult>해당 클래스룸의 방이 없습니다.</EmptyResult>
              ) : (
                <RoomGrid>
                  {classroomRooms.map((room) => (
                    <RoomCard
                      key={room.roomCode}
                      onClick={() => setSelectedRoomCode(room.roomCode)}
                    >
                      <RoomCode>{room.roomCode}</RoomCode>
                      <RoomInfo>
                        <div>{room.hostName}</div>
                        <div>
                          {room.currentParticipants}/{room.maxParticipants}명
                        </div>
                        <StatusBadge status={room.status}>
                          {room.status}
                        </StatusBadge>
                      </RoomInfo>
                    </RoomCard>
                  ))}
                </RoomGrid>
              )}
            </ResultContainer>
          )}
        </Section>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: #f9fafb;
  padding: 40px 20px;
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #6b7280;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
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
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  color: #6b7280;
`;

const ResultContainer = styled.div`
  margin-top: 16px;
`;

const EmptyResult = styled.div`
  text-align: center;
  padding: 40px;
  color: #9ca3af;
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const RoomCard = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    transform: translateY(-2px);
  }
`;

const RoomCode = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 12px;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
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
