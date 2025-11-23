import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuTrophy } from "react-icons/lu";
import * as s from "./styles";
import { colors } from "@/shared/theme/theme.styles";

type CharacterKey = "owl" | "haeyul" | "panda" | "ferret" | "I" | "koala";
const npcColors: Record<CharacterKey, { bg: string; border: string }> = {
    owl: { bg: colors.npc.owl[0], border: colors.npc.owl[1] },
    haeyul: { bg: colors.npc.haeyul[0], border: colors.npc.haeyul[1] },
    panda: { bg: colors.npc.panda[0], border: colors.npc.panda[1] },
    ferret: { bg: colors.npc.ferret[0], border: colors.npc.ferret[1] },
    I: { bg: colors.npc.I[0], border: colors.npc.I[1] },
    koala: { bg: colors.npc.koala[0], border: colors.npc.koala[1] },
};

const PODIUM_KEYS: CharacterKey[] = ["koala", "panda", "haeyul"]; // 1~3등 색상

type Student = {
    id: string;
    name: string;
    score?: number;
    correct?: number;
};

type Props = {
    students: Student[];
    onRestart: () => void;
};

export default function FinalRanking({ students, onRestart }: Props) {
    const navigate = useNavigate();
    const [visiblePodiums, setVisiblePodiums] = useState<number[]>([]);
    const [showRemaining, setShowRemaining] = useState(false);
    const [visibleRemainingCount, setVisibleRemainingCount] = useState(0);

    const rankedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));
    const topThree = rankedStudents.slice(0, 3);
    const remaining = rankedStudents.slice(3);

    useEffect(() => {
        // 3등 -> 2등 -> 1등 순서로 표시
        const timers = [
            setTimeout(() => setVisiblePodiums([2]), 500),
            setTimeout(() => setVisiblePodiums([2, 1]), 1000),
            setTimeout(() => setVisiblePodiums([2, 1, 0]), 1500),
            setTimeout(() => setShowRemaining(true), 2200),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (!showRemaining || remaining.length === 0) return;

        const timer = setInterval(() => {
            setVisibleRemainingCount(prev => {
                if (prev >= remaining.length) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 150);

        return () => clearInterval(timer);
    }, [showRemaining, remaining.length]);

    const getHeight = (rank: number) => {
        if (rank === 1) return 280;
        if (rank === 2) return 220;
        if (rank === 3) return 180;
        return 150;
    };

    const handleSubmit = () => navigate("/");

    return (
        <s.Container>
            <s.Title>
                <LuTrophy />&nbsp;최종 랭킹
            </s.Title>

            <s.PodiumContainer>
                {topThree.map((student, index) => {
                    const rank = index + 1;
                    const key = PODIUM_KEYS[index];
                    const isVisible = visiblePodiums.includes(index);

                    return (
                        <s.PodiumItem key={student.id} rank={rank}>
                            <s.PodiumBox
                                bgColor={npcColors[key].bg}
                                borderColor={npcColors[key].border}
                                height={getHeight(rank)}
                                rank={rank}
                                isVisible={isVisible}
                            >
                                <s.RankBadge>
                                    #{rank} {student.name}
                                </s.RankBadge>
                            </s.PodiumBox>
                        </s.PodiumItem>
                    );
                })}
            </s.PodiumContainer>

            <s.Buttons>
                <s.RetrunButton onClick={onRestart}>다시풀기</s.RetrunButton>
                <s.SubmitButton onClick={handleSubmit}>종료</s.SubmitButton>
            </s.Buttons>

            {remaining.length > 0 && (
                <s.RemainingList showRemaining={showRemaining}>
                    {remaining.slice(0, visibleRemainingCount).map((student, index) => (
                        <s.RemainingItem key={student.id} index={index}>
                            <s.RankNumber>{index + 4}</s.RankNumber>
                            <s.StudentName>{student.name}</s.StudentName>
                        </s.RemainingItem>
                    ))}
                </s.RemainingList>
            )}
        </s.Container>
    );
}