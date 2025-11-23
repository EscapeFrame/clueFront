export type QuestionType = "multiple" | "moving" | "roulette";

export type Question = {
    id: string;
    type: QuestionType;
    question: string;
    options: string[];
    correctIndex: number;
};

// 더미 데이터
export const dummyQuestions: Question[] = [
    {
        id: "q1",
        type: "multiple",
        question: "다음 중 프론트엔드 프레임워크가 아닌 것은?",
        options: ["React", "Vue", "Angular", "Django"],
        correctIndex: 3,
    },
    {
        id: "q2",
        type: "moving",
        question: "다음 중 CSS 속성이 아닌 것은?",
        options: ["color", "margin", "padding", "fontawesome"],
        correctIndex: 3,
    },
    {
        id: "q3",
        type: "roulette",
        question: "다음 중 JS 데이터 타입이 아닌 것은?",
        options: ["string", "number", "boolean", "float64"],
        correctIndex: 3,
    },
];