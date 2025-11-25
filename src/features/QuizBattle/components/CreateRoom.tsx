import React, { useState, useEffect } from 'react';
import QuizBattleService from '../services/QuizBattleService';
import type { RoomData } from '../types';
import { CreateRoomContainer, FormGroup, Label, Input, Button } from './styles';

interface CreateRoomProps {
  token?: string;
  onRoomCreated?: (roomCode: string, isHost: boolean) => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ token, onRoomCreated }) => {
  const [formData, setFormData] = useState<RoomData>({
    maxParticipants: 10,
    questionCount: 10,
    timePerQuestion: 30,
    classRoomId: null,
    documentId: null,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // WebSocket 연결 (token은 QuizBattleService가 자동으로 localStorage에서 가져옴)
    QuizBattleService.connect(
      token,
      () => {
        console.log('[CreateRoom] Connected successfully');
        setIsConnected(true);
      },
      (error) => {
        console.error('[CreateRoom] Connection error:', error);
        alert('WebSocket 연결 실패');
        setIsConnected(false);
      }
    );

    return () => {
      QuizBattleService.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      alert('WebSocket이 연결되지 않았습니다.');
      return;
    }

    setIsCreating(true);

    QuizBattleService.createRoom(formData, (response) => {
      setIsCreating(false);
      // 새 명세서: type: 'ROOM_CREATED' 또는 status: 'success' 확인
      if (
        (response.type === 'ROOM_CREATED' || response.status === 'success') &&
        response.roomCode
      ) {
        console.log('Room created:', response);
        if (onRoomCreated) {
          onRoomCreated(response.roomCode, true); // roomCode, isHost
        }
      } else {
        alert('방 생성 실패: ' + (response.message || '알 수 없는 오류'));
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('Id') ? value || null : parseInt(value, 10),
    }));
  };

  return (
    <CreateRoomContainer>
      <h2>퀴즈 배틀 방 만들기</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="maxParticipants">최대 참가자 수:</Label>
          <Input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            min="2"
            max="50"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="questionCount">문제 수:</Label>
          <Input
            type="number"
            id="questionCount"
            name="questionCount"
            value={formData.questionCount}
            onChange={handleChange}
            min="5"
            max="50"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="timePerQuestion">문제당 시간 (초):</Label>
          <Input
            type="number"
            id="timePerQuestion"
            name="timePerQuestion"
            value={formData.timePerQuestion}
            onChange={handleChange}
            min="10"
            max="300"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="classRoomId">교실 ID (선택):</Label>
          <Input
            type="text"
            id="classRoomId"
            name="classRoomId"
            value={formData.classRoomId || ''}
            onChange={handleChange}
            placeholder="선택 사항"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="documentId">문서 ID (선택):</Label>
          <Input
            type="text"
            id="documentId"
            name="documentId"
            value={formData.documentId || ''}
            onChange={handleChange}
            placeholder="선택 사항"
          />
        </FormGroup>

        <Button type="submit" disabled={!isConnected || isCreating}>
          {isCreating ? '방 생성 중...' : '방 만들기'}
        </Button>
      </form>

      {!isConnected && <p>WebSocket 연결 중...</p>}
    </CreateRoomContainer>
  );
};

export default CreateRoom;
