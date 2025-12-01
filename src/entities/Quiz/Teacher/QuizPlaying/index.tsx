import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";

import QuizHeader from "@/widgets/Quiz/Header";
import { colors } from "@/shared/theme/theme.styles";

type CharacterKey = "owl" | "haeyul" | "panda" | "ferret" | "I" | "koala";

type Question = {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
};

const npcColors: Record<CharacterKey, { bg: string; border: string }> = {
    owl: { bg: colors.npc.owl[0], border: colors.npc.owl[1] },
    haeyul: { bg: colors.npc.haeyul[0], border: colors.npc.haeyul[1] },
    panda: { bg: colors.npc.panda[0], border: colors.npc.panda[1] },
    ferret: { bg: colors.npc.ferret[0], border: colors.npc.ferret[1] },
    I: { bg: colors.npc.I[0], border: colors.npc.I[1] },
    koala: { bg: colors.npc.koala[0], border: colors.npc.koala[1] },
};

const OPTION_KEYS: CharacterKey[] = ["haeyul", "panda", "I", "koala"];

type Props = {
    question: Question;
    onShowResult: () => void; // 정답 확인 버튼용
    // totalStudents: number;     // 전체 인원 (더 이상 사용되지 않음)
    currentQuestionNumber?: number; // 현재 문제 번호
    totalQuestions?: number;   // 전체 문제 개수
    timePerQuestion?: number;  // 문제당 시간
};

export default function QuizPlaying({
    question,
    onShowResult,
    currentQuestionNumber = 1,
    totalQuestions = 10,
    timePerQuestion = 30
}: Props) {
    // 제출자 수 관련 기능 제거됨
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(timePerQuestion);

    const totalTime = timePerQuestion;
    const current = currentQuestionNumber;
    const total = totalQuestions;

    // 문제가 바뀔 때마다 타이머 초기화
    useEffect(() => {
        setTimeLeft(timePerQuestion);
    }, [question.id, timePerQuestion]);

    // 타이머
    useEffect(() => {
        if (timeLeft <= 0) {
            onShowResult();
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, onShowResult]);

    if (!question) return <s.Container>문제가 없습니다.</s.Container>;

    const handleQuit = () => navigate("/");

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
                <s.Section>
                    <s.PointText>{current}</s.PointText>&nbsp;/ {total}
                </s.Section>

                <s.Question>{question.question}</s.Question>

                <s.OptionsGrid>
                    {question.options.slice(0, 2).map((opt, i) => {
                        const key = OPTION_KEYS[i];
                        return (
                            <s.OptionLarge
                                key={i}
                                bgColor={npcColors[key].bg}
                                borderColor={npcColors[key].border}
                            >
                                <s.OptionNumber>{i + 1}</s.OptionNumber>
                                {opt}
                            </s.OptionLarge>
                        );
                    })}

                    {question.options.slice(2, 4).map((opt, i) => {
                        const key = OPTION_KEYS[i + 2];
                        return (
                            <s.OptionLarge
                                key={i + 2}
                                bgColor={npcColors[key].bg}
                                borderColor={npcColors[key].border}
                            >
                                <s.OptionNumber>{i + 3}</s.OptionNumber>
                                {opt}
                            </s.OptionLarge>
                        );
                    })}
                </s.OptionsGrid>
            </s.Card>

            <s.SubmitButton onClick={onShowResult}>
                정답 확인
            </s.SubmitButton>
        </s.Container>
    );
}