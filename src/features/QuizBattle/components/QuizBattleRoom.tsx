import React, { useState, useEffect } from 'react';
import QuizBattleService from '../services/QuizBattleService';
import type {
  ParticipantInfo,
  QuestionData,
  GameStatus,
  RankingData,
  AnswerResult,
} from '../types';
import {
  RoomContainer,
  RoomHeader,
  ParticipantsSection,
  ParticipantsList,
  ParticipantItem,
  WaitingSection,
  QuestionSection,
  QuestionHeader,
  Timer,
  QuestionText,
  OptionsGrid,
  OptionButton,
  ResultMessage,
  FinishedSection,
  RankingsList,
  RankingItem,
  ButtonGroup,
  Button,
} from './styles';

interface QuizBattleRoomProps {
  token?: string;
  roomCode: string;
  isHost: boolean;
  onLeaveRoom?: () => void;
}

const QuizBattleRoom: React.FC<QuizBattleRoomProps> = ({
  token,
  roomCode,
  isHost,
  onLeaveRoom,
}) => {
  const [participants, setParticipants] = useState<ParticipantInfo[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const [rankings, setRankings] = useState<RankingData[]>([]);
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    // WebSocket 연결 (token은 QuizBattleService가 자동으로 localStorage에서 가져옴)
    QuizBattleService.connect(
      token,
      () => {
        console.log('[QuizBattleRoom] Connected successfully');
        // 방 참가
        joinRoom();
      },
      (error) => {
        console.error('[QuizBattleRoom] Connection error:', error);
        const errorMessage = error?.message || '알 수 없는 오류';
        alert('WebSocket 연결 실패: ' + errorMessage);
      }
    );

    return () => {
      // 컴포넌트 언마운트 시 방 나가기
      QuizBattleService.leaveRoom(roomCode);
      QuizBattleService.disconnect();
    };
  }, [roomCode]);

  // 타이머 관리
  useEffect(() => {
    if (currentQuestion && timeLeft > 0 && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentQuestion, gameStatus]);

  const joinRoom = () => {
    QuizBattleService.joinRoom(roomCode, {
      // 참가자 업데이트
      onParticipantUpdate: (response) => {
        console.log('Participant update:', response);
        if (response.status === 'success' && response.allParticipants) {
          setParticipants(response.allParticipants);
        }
      },

      // 문제 수신
      onQuestion: (question) => {
        console.log('New question:', question);
        setCurrentQuestion(question);
        setTimeLeft(question.timeLimit);
        setQuestionStartTime(Date.now());
        setGameStatus('playing');
        setAnswerResult(null);
        setSelectedAnswer(null);
      },

      // 답변 결과
      onAnswerResult: (result) => {
        console.log('Answer result:', result);
        setAnswerResult(result);
      },

      // 퀴즈 종료
      onQuizFinished: (response) => {
        console.log('Quiz finished:', response);
        setGameStatus('finished');
        if (response.finalRankings) {
          setRankings(response.finalRankings);
        }
        setCurrentQuestion(null);
      },

      // 방 취소
      onRoomCancelled: (response) => {
        console.log('Room cancelled:', response);
        alert('방이 호스트에 의해 취소되었습니다.');
        if (onLeaveRoom) onLeaveRoom();
      },

      // 에러
      onError: (error) => {
        console.error('Error:', error);
        alert('오류: ' + (error.message || '알 수 없는 오류'));
      },
    });
  };

  const handleStartQuiz = () => {
    if (!isHost) {
      alert('호스트만 퀴즈를 시작할 수 있습니다.');
      return;
    }
    QuizBattleService.startQuiz(roomCode);
  };

  const handleSubmitAnswer = (answerIndex: number) => {
    if (!currentQuestion || answerResult !== null) return;

    // 새 명세서: timeSpent는 밀리초(ms) 단위
    const timeSpent = questionStartTime ? Date.now() - questionStartTime : 0;

    setSelectedAnswer(answerIndex);

    QuizBattleService.submitAnswer(roomCode, {
      questionNumber: currentQuestion.questionNumber,
      answerIndex: answerIndex,
      submittedAt: Date.now(), // epoch ms
      timeSpent: timeSpent, // 밀리초 (ms)
    });
  };

  const handleNextQuestion = () => {
    if (!isHost) {
      alert('호스트만 다음 문제로 넘어갈 수 있습니다.');
      return;
    }
    QuizBattleService.nextQuestion(roomCode);
  };

  const handleGetRankings = () => {
    QuizBattleService.getRankings(roomCode, (response) => {
      if (response.status === 'success' && response.rankings) {
        setRankings(response.rankings);
      }
    });
  };

  const handleCancelRoom = () => {
    if (!isHost) {
      alert('호스트만 방을 취소할 수 있습니다.');
      return;
    }
    if (window.confirm('정말로 방을 취소하시겠습니까?')) {
      QuizBattleService.cancelRoom(roomCode);
      if (onLeaveRoom) onLeaveRoom();
    }
  };

  const handleLeaveRoom = () => {
    if (window.confirm('방을 나가시겠습니까?')) {
      QuizBattleService.leaveRoom(roomCode);
      if (onLeaveRoom) onLeaveRoom();
    }
  };

  return (
    <RoomContainer>
      <RoomHeader>
        <h1>Quiz Battle</h1>
        <p>방 코드: {roomCode}</p>
      </RoomHeader>

      {/* 참가자 목록 */}
      <ParticipantsSection>
        <h2>참가자 ({participants.length}명)</h2>
        <ParticipantsList>
          {participants.map((p, idx) => (
            <ParticipantItem key={idx}>
              {p.username} {p.isHost ? '👑' : ''} - {p.score}점
            </ParticipantItem>
          ))}
        </ParticipantsList>
      </ParticipantsSection>

      {/* 대기 상태 */}
      {gameStatus === 'waiting' && (
        <WaitingSection>
          <h2>퀴즈 시작 대기 중...</h2>
          <ButtonGroup>
            {isHost ? (
              <>
                <Button onClick={handleStartQuiz} primary>
                  퀴즈 시작
                </Button>
                <Button onClick={handleCancelRoom} danger>
                  방 취소
                </Button>
              </>
            ) : (
              <p>호스트가 퀴즈를 시작할 때까지 기다려주세요...</p>
            )}
            <Button onClick={handleLeaveRoom}>방 나가기</Button>
          </ButtonGroup>
        </WaitingSection>
      )}

      {/* 게임 진행 중 */}
      {gameStatus === 'playing' && currentQuestion && (
        <QuestionSection>
          <QuestionHeader>
            <h2>
              문제 {currentQuestion.questionNumber} / {currentQuestion.totalQuestions}
            </h2>
            <Timer warning={timeLeft <= 5}>남은 시간: {timeLeft}초</Timer>
          </QuestionHeader>

          <QuestionText>{currentQuestion.questionText}</QuestionText>

          <OptionsGrid>
            {currentQuestion.options.map((option, idx) => (
              <OptionButton
                key={idx}
                onClick={() => handleSubmitAnswer(idx)}
                disabled={answerResult !== null}
                selected={selectedAnswer === idx}
                correct={
                  answerResult !== null &&
                  answerResult.isCorrect &&
                  idx === selectedAnswer
                }
                incorrect={
                  answerResult !== null &&
                  !answerResult.isCorrect &&
                  idx === selectedAnswer
                }
              >
                {option}
              </OptionButton>
            ))}
          </OptionsGrid>

          {answerResult && (
            <ResultMessage correct={answerResult.isCorrect}>
              {answerResult.isCorrect ? '✓ 정답입니다!' : '✗ 틀렸습니다!'}
              <br />
              획득 점수: {answerResult.points}점
            </ResultMessage>
          )}

          <ButtonGroup>
            {isHost && (
              <Button onClick={handleNextQuestion} primary>
                다음 문제
              </Button>
            )}
            <Button onClick={handleGetRankings}>현재 순위 보기</Button>
          </ButtonGroup>
        </QuestionSection>
      )}

      {/* 게임 종료 */}
      {gameStatus === 'finished' && (
        <FinishedSection>
          <h2>🎉 퀴즈 종료!</h2>
          <h3>최종 순위</h3>
          <RankingsList>
            {rankings.map((ranking, idx) => (
              <RankingItem key={idx} rank={idx + 1}>
                <span className="rank">
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}위`}
                </span>
                <span className="username">{ranking.username}</span>
                <span className="score">
                  {ranking.totalScore}점 (정답: {ranking.correctAnswers}/
                  {ranking.totalQuestions})
                </span>
              </RankingItem>
            ))}
          </RankingsList>
          <Button onClick={handleLeaveRoom}>방 나가기</Button>
        </FinishedSection>
      )}

      {/* 현재 순위 */}
      {rankings.length > 0 && gameStatus !== 'finished' && (
        <ParticipantsSection>
          <h3>현재 순위</h3>
          <RankingsList>
            {rankings.map((ranking, idx) => (
              <RankingItem key={idx} rank={idx + 1}>
                <span className="rank">{idx + 1}위</span>
                <span className="username">{ranking.username}</span>
                <span className="score">{ranking.totalScore}점</span>
              </RankingItem>
            ))}
          </RankingsList>
        </ParticipantsSection>
      )}
    </RoomContainer>
  );
};

export default QuizBattleRoom;
