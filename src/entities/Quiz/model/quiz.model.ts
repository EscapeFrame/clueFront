// src/entities/Quiz/model/quiz.model.ts

export type Participant = {
    userId: string;
    username: string;
    // 기타 필요한 참가자 정보
};

export type Question = {
    questionNumber: number;
    questionText: string;
    options: string[];
    timeLimit: number;
    difficulty: string;
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
