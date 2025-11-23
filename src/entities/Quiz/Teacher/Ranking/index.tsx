import QuizHeader from "@/widgets/Quiz/Header";
import { LuTrophy } from "react-icons/lu";

import * as s from "./styles";
import { colors } from "@/shared/theme/theme.styles";

type StudentAnswer = {
    id: string;
    name: string;
    answers: Record<string, number>; // key: questionId, value: 선택한 옵션 index
};

type Props = {
    students: StudentAnswer[];
    currentQuestionId: string; // 지금 보는 문제 id
    onNext: () => void;
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

export default function Ranking({ students,onNext, current, total, handleQuit }: Props) {
    // 랭킹 정렬 (여기서는 예시로 이름 순으로 정렬, 실제로는 점수나 시간으로 정렬)
    const rankedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));
    
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
                        <s.PodiumItem key={student.id} rank={rank}>
                            <s.PodiumBox
                                bgColor={npcColors[key].bg}
                                borderColor={npcColors[key].border}
                                height={getHeight(rank)}
                                rank={rank}
                            >
                                <s.RankBadge>
                                    #{rank} {student.name}
                                </s.RankBadge>
                            </s.PodiumBox>
                        </s.PodiumItem>
                    );
                })}
            </s.PodiumContainer>
            
            <s.SubmitButton onClick={onNext}>다음문제</s.SubmitButton>

            {remaining.length > 0 && (
                <s.RemainingList>
                    {remaining.map((student, index) => (
                        <s.RemainingItem key={student.id}>
                            <s.RankNumber>{index + 4}</s.RankNumber>
                            <s.StudentName>{student.name}</s.StudentName>
                        </s.RemainingItem>
                    ))}
                </s.RemainingList>
            )}
        </s.Container>
    );
}