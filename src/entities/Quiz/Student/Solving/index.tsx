import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";

import QuizHeader from "@/widgets/Quiz/Header";
import MultipleOptions from "./Option/multiple";
import RouletteOptions from "./Option/roulette";
import MovingOptions from "./Option/moving";

type QuestionType = "multiple" | "moving" | "roulette";
type OptionKeys = "haeyul" | "panda" | "ferret" | "koala";

type Question = {
    id: string;
    type: QuestionType;
    question: string;
    options: string[];
    correctIndex: number;
};

type Props = {
    question?: Question; // 예시로 1개 문제 전달
    onSubmitAnswer: (answerIndex: number) => void;
};

export default function Solving({ question, onSubmitAnswer }: Props) {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(20); // 예: 문제당 20초
    const totalTime = 20;
    const current = 1;
    const total = 10;

    // 타이머
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    if (!question) return <s.Container>문제가 없습니다.</s.Container>;

    const handleQuit = () => {
        navigate("/"); // /main으로 이동
    };

    const OPTION_KEYS: OptionKeys[] = ["haeyul", "panda", "ferret", "koala"];

    return (
        <s.Container>
            <QuizHeader
                current={current}
                total={total}
                timeLeft={timeLeft}
                totalTime={totalTime}
                onQuit={handleQuit}
            />

            <s.Card>
                <s.Question>{question.question}</s.Question>

                {question.type === "multiple" && (
                    <MultipleOptions
                        options={question.options}
                        optionKeys={OPTION_KEYS.slice() as ("haeyul" | "panda" | "ferret" | "koala")[]}
                        onSelect={(i) => onSubmitAnswer(i)}
                    />
                )}

                {question.type === "moving" && (
                    <MovingOptions
                        options={question.options}
                        optionKeys={OPTION_KEYS}
                        onSelect={(i) => setSelectedIndex(i)}
                    />
                )}

                {question.type === "roulette" && (
                    <RouletteOptions
                        options={question.options as [string, string, string, string]}
                        optionKeys={OPTION_KEYS as [OptionKeys, OptionKeys, OptionKeys, OptionKeys]}
                        onSelect={(i) => setSelectedIndex(i)}
                    />
                )}
            </s.Card>
        </s.Container>
    );
}