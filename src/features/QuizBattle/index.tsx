import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoomList from './components/RoomList';
import CreateRoom from './components/CreateRoom';
import QuizBattleRoom from './components/QuizBattleRoom';

type ViewMode = 'list' | 'create' | 'room';

interface QuizBattleProps {
  token?: string;
}

const QuizBattle: React.FC<QuizBattleProps> = ({ token: propToken }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [roomCode, setRoomCode] = useState<string>('');
  const [isHost, setIsHost] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 토큰 가져오기 (props 또는 localStorage)
  const token = propToken || localStorage.getItem('accessToken') || '';

  useEffect(() => {
    // URL 파라미터에서 roomCode 확인
    const roomCodeParam = searchParams.get('roomCode');
    const isHostParam = searchParams.get('isHost') === 'true';

    if (roomCodeParam) {
      setRoomCode(roomCodeParam);
      setIsHost(isHostParam);
      setViewMode('room');
    }
  }, [searchParams]);

  const handleCreateRoom = () => {
    setViewMode('create');
  };

  const handleRoomCreated = (newRoomCode: string, host: boolean) => {
    setRoomCode(newRoomCode);
    setIsHost(host);
    setViewMode('room');
    // URL 파라미터 업데이트
    setSearchParams({ roomCode: newRoomCode, isHost: host.toString() });
  };

  const handleJoinRoom = (joinRoomCode: string) => {
    setRoomCode(joinRoomCode);
    setIsHost(false);
    setViewMode('room');
    // URL 파라미터 업데이트
    setSearchParams({ roomCode: joinRoomCode, isHost: 'false' });
  };

  const handleLeaveRoom = () => {
    setRoomCode('');
    setIsHost(false);
    setViewMode('list');
    // URL 파라미터 제거
    setSearchParams({});
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSearchParams({});
  };

  // 토큰이 없으면 경고 표시
  if (!token) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>로그인이 필요합니다</h2>
        <p>퀴즈 배틀을 이용하려면 로그인해주세요.</p>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  return (
    <div>
      {viewMode === 'list' && (
        <RoomList onJoinRoom={handleJoinRoom} onCreateRoom={handleCreateRoom} />
      )}

      {viewMode === 'create' && (
        <div>
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <button
              onClick={handleBackToList}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                background: 'none',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              ← 뒤로 가기
            </button>
          </div>
          <CreateRoom token={token} onRoomCreated={handleRoomCreated} />
        </div>
      )}

      {viewMode === 'room' && roomCode && (
        <QuizBattleRoom
          token={token}
          roomCode={roomCode}
          isHost={isHost}
          onLeaveRoom={handleLeaveRoom}
        />
      )}
    </div>
  );
};

export default QuizBattle;
