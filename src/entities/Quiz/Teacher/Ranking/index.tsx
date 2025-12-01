import QuizHeader from "@/widgets/Quiz/Header";
import { LuTrophy } from "react-icons/lu";

import * as s from "./styles";
import { colors } from "@/shared/theme/theme.styles";
import { Ranking as RankingType } from "../../model/quiz.model";

type Props = {
    students: RankingType[];
    onNext: () => void;
    onBack: () => void;
    current: number;
    total: number;
    handleQuit: () => void;
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

const PODIUM_KEYS: CharacterKey[] = ["koala", "panda", "haeyul"]; // 1등~3등 색상 순서

export default function Ranking({ students, onNext, onBack, current, total, handleQuit }: Props) {
    const rankedStudents = [...students].sort((a, b) => b.totalScore - a.totalScore);
    
    const topThree = rankedStudents.slice(0, 3);
    const remaining = rankedStudents.slice(3);

    const getHeight = (rank: number) => {
        if (rank === 1) return 280;
        if (rank === 2) return 220;
        if (rank === 3) return 180;
        return 150;
    };

    return (
        <s.Container>
            <QuizHeader current={current} total={total} onQuit={handleQuit} />

            <s.Title>
                <LuTrophy />&nbsp;현재 랭킹
            </s.Title>

            <s.PodiumContainer>
                {topThree.map((student, index) => {
                    const rank = index + 1;
                    const key = PODIUM_KEYS[index];
                    
                    return (
                        <s.PodiumItem key={student.userId} rank={rank}>
                            <s.PodiumBox
                                bgColor={npcColors[key].bg}
                                borderColor={npcColors[key].border}
                                height={getHeight(rank)}
                                rank={rank}
                            >
                                <s.RankBadge>
                                    #{rank} {student.username} - {student.totalScore}점
                                </s.RankBadge>
                            </s.PodiumBox>
                        </s.PodiumItem>
                    );
                })}
            </s.PodiumContainer>
            
            <s.ButtonContainer>
                <s.SubmitButton onClick={onBack}>뒤로가기</s.SubmitButton>
                <s.SubmitButton onClick={onNext}>다음문제</s.SubmitButton>
            </s.ButtonContainer>

            {remaining.length > 0 && (
                <s.RemainingList>
                    {remaining.map((student, index) => (
                        <s.RemainingItem key={student.userId}>
                            <s.RankNumber>{index + 4}</s.RankNumber>
                            <s.StudentName>{student.username}</s.StudentName>
                            <s.StudentScore>{student.totalScore}점</s.StudentScore>
                        </s.RemainingItem>
                    ))}
                </s.RemainingList>
            )}
        </s.Container>
    );
}