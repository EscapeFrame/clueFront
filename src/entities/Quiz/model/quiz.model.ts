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
