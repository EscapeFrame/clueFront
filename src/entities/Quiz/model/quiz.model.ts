// src/entities/Quiz/model/quiz.model.ts

export type Participant = {
    userId: string;
    username: string;
    sessionId?: string;
    score?: number;
    correctAnswers?: number;
    isReady?: boolean;
    joinedAt?: number;
};

export type Question = {
    questionNumber: number;
    questionText: string;
    options: string[];
    timeLimit: number;
    difficulty: string;
    correctAnswer?: number;  // 선생님만 볼 수 있음
};

export type Ranking = {
    rank: number;
    userId: string;
    username: string;
    totalScore: number;
    correctAnswers: number;
    totalQuestions: number;
    accuracy: number;
};

// 정답 공개 메시지
export type AnswerRevealMessage = {
    questionNumber: number;
    correctAnswer: number;       // 정답 인덱스
    explanation: string;
    statistics: {                // 각 선택지별 인원
        [key: number]: number;
    };
    totalAnswers: number;
    status: string;
    message?: string;
};

// 개인 답안 결과
export type AnswerResultMessage = {
    questionNumber: number;
    isCorrect: boolean;
    points: number;
    status: string;
};

// 퀴즈 시작 메시지
export type QuizStatusMessage = {
    status: string;
    message?: string;
};

// 방 생성 응답
export type RoomCreatedMessage = {
    roomCode: string;
    hostId: string;
    maxParticipants: number;
    questionCount: number;
    timePerQuestion: number;
    status: string;
    message?: string;
};

// 참가자 입장 메시지
export type ParticipantJoinedMessage = {
    participant: Participant;
    totalParticipants: number;
    allParticipants: Participant[];
    status: string;
    message?: string;
};

// 참가자 퇴장 메시지
export type ParticipantLeftMessage = {
    userId: string;
    totalParticipants: number;
    allParticipants: Participant[];
    status: string;
};

// 퀴즈 종료 메시지
export type QuizFinishedMessage = {
    roomCode: string;
    finalRankings: Ranking[];
    status: string;
    message?: string;
};

// 방 취소 메시지
export type RoomCancelledMessage = {
    roomCode: string;
    reason: string;
    status: string;
    message?: string;
};
