import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizHeader from "@/widgets/Quiz/Header";
import * as s from "./styles";
import Ranking from "../Ranking";
import { colors } from "@/shared/theme/theme.styles";

type Question = {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
};

type StudentAnswer = {
    id: string;
    name: string;
    answers: Record<string, number>; // key: questionId, value: 선택한 옵션 index
};

// props 예시
type Props = {
    current: number;
    total: number;
    question: Question;
    students: StudentAnswer[];
    onSubmit: () => void;
};

type CharacterKey = "owl" | "haeyul" | "panda" | "ferret" | "I" | "koala";
const npcColors: Record<CharacterKey, { bg: string; border: string }> = {
    owl: { bg: colors.npc.owl[0], border: colors.npc.owl[1] },
    haeyul: { bg: colors.npc.haeyul[0], border: colors.npc.haeyul[1] },
    panda: { bg: colors.npc.panda[0], border: colors.npc.panda[1] },
    ferret: { bg: colors.npc.ferret[0], border: colors.npc.ferret[1] },
    I: { bg: colors.npc.I[0], border: colors.npc.I[1] },
    koala: { bg: colors.npc.koala[0], border: colors.npc.koala[1] },
};

const OPTION_KEYS: CharacterKey[] = ["haeyul", "panda", "ferret", "koala"];

export default function QuizResult({ current, total, question, students, onSubmit }: Props) {
    const navigate = useNavigate();
    const [showRanking, setShowRanking] = useState(false);

    const handleQuit = () => navigate("/");

    if (showRanking) {
        return <Ranking students={students} currentQuestionId={question.id} onNext={onSubmit} current={current} total={total} handleQuit={handleQuit} />
    }

    // 각 옵션별 응답 수 계산
    const optionCounts = question.options.map((_, i) =>
        students.filter(student => student.answers[question.id] === i).length
    );

    // 최대값을 기준으로 높이 계산 (최소 100px, 최대 300px)
    const maxCount = Math.max(...optionCounts, 1);
    const getHeight = (count: number) => {
        const minHeight = 100;
        const maxHeight = 300;
        return minHeight + ((count / maxCount) * (maxHeight - minHeight));
    };

    return (
        <s.Container>
            <QuizHeader current={current} total={total} onQuit={handleQuit} />

            <s.Question>{question.question}</s.Question>
            <s.CorrectIndex>
                {question.correctIndex + 1}. {question.options[question.correctIndex]}
            </s.CorrectIndex>

            <s.Card>
                {question.options.map((opt, i) => {
                    const key = OPTION_KEYS[i];
                    const count = optionCounts[i];

                    return (
                        <s.OptionColumn key={i}>
                            <s.OptionBox
                                bgColor={npcColors[key].bg}
                                borderColor={npcColors[key].border}
                                height={getHeight(count)}
                            >
                                <s.CountNumber>{count}</s.CountNumber>
                            </s.OptionBox>
                            <s.OptionLabel
                                bgColor={npcColors[key].bg}
                                borderColor={npcColors[key].border}
                            >
                                {i + 1} {opt}
                            </s.OptionLabel>
                        </s.OptionColumn>
                    );
                })}
            </s.Card>

            <s.Buttons>
                <s.RakingButton onClick={() => setShowRanking(true)}>랭킹보기</s.RakingButton>
                <s.SubmitButton onClick={onSubmit}>다음 문제</s.SubmitButton>
            </s.Buttons>
        </s.Container>
    );
}