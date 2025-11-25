import React, { useState } from 'react';
import {
  RoomListContainer,
  RoomListHeader,
  JoinRoomSection,
  FormGroup,
  Label,
  Input,
  Button,
  RoomGrid,
  RoomCard,
  RoomInfo,
  RoomStatus,
} from './styles';

interface RoomListProps {
  onJoinRoom?: (roomCode: string) => void;
  onCreateRoom?: () => void;
}

const RoomList: React.FC<RoomListProps> = ({ onJoinRoom, onCreateRoom }) => {
  const [roomCode, setRoomCode] = useState('');

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.trim() && onJoinRoom) {
      onJoinRoom(roomCode.trim().toUpperCase());
    }
  };

  return (
    <RoomListContainer>
      <RoomListHeader>
        <h1>퀴즈 배틀</h1>
        <p>친구들과 함께 실시간 퀴즈 대결을 즐겨보세요!</p>
      </RoomListHeader>

      <JoinRoomSection>
        <h2>방 참가하기</h2>
        <form onSubmit={handleJoinRoom}>
          <FormGroup>
            <Label htmlFor="roomCode">방 코드 입력:</Label>
            <Input
              type="text"
              id="roomCode"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="예: ABC123"
              maxLength={6}
              required
            />
          </FormGroup>
          <Button type="submit" primary>
            참가하기
          </Button>
        </form>
      </JoinRoomSection>

      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <h3>또는</h3>
        <Button onClick={onCreateRoom} primary large>
          새 방 만들기
        </Button>
      </div>

      {/* 활성 방 목록 (향후 구현 가능) */}
      {/* <div>
        <h2>활성 방 목록</h2>
        <RoomGrid>
          예시 방 카드들...
        </RoomGrid>
      </div> */}
    </RoomListContainer>
  );
};

export default RoomList;
