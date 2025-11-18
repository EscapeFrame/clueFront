import { useNavigate } from 'react-router-dom';
import { FaCheck, FaXmark } from "react-icons/fa6";
import { HiTrendingUp } from "react-icons/hi";
import * as s from "./styles";
import { colors } from "@/shared/theme/theme.styles";

type Character =
    | "owl"
    | "Haeyul"
    | "panda"
    | "ferret"
    | "I"
    | "koala";

const CHARACTERS: Character[] = [
    "owl",
    "Haeyul",
    "panda",
    "ferret",
    "I",
    "koala",
];

const getCharacterImage = (character: string) => `/Paletto/${character}.png`;

type Props = {
    character: string;
    ranking: number;
    score: number;
    correctCount: number;
    totalQuestions: number;
};

export default function FinalResult({
    character, ranking, score, correctCount, totalQuestions,
}: Props) {
    const navigate = useNavigate();
    const wrongCount = totalQuestions - correctCount;
    const correctRate = Math.round((correctCount / totalQuestions) * 100);

    const items = [
        { icon: <FaCheck />, label: "정답", value: correctCount, color: colors.primary },
        { icon: <FaXmark />, label: "오답", value: wrongCount, color: colors.red[3] },
        { icon: <HiTrendingUp />, label: "정답률", value: correctRate, color: colors.black, suffix: "%" },
    ];

    const handleClick = () => {
        navigate(`/`);
    };

    return (
        <s.Container>
            <s.Card>
                <s.Title>퀴즈 완료!</s.Title>
                <s.Character>
                    {character ? (
                        <img
                            src={getCharacterImage(character)}
                            width={150}
                            height={150}
                            alt={character}
                        />
                    ) : (
                        <span>캐릭터 없음</span>
                    )}
                </s.Character>

                <s.Section>
                    <s.MyRanking>내 순위 {ranking}위</s.MyRanking>
                    <s.MyScore>최종 점수 {score}</s.MyScore>
                </s.Section>

                <s.Section style={{ padding: "0 5rem" }}>
                    {items.map((item, idx) => (
                        <s.Item key={idx} color={item.color}>
                            {item.icon}
                            <span>
                                {item.value}
                                {item.suffix ?? ""}
                            </span>
                            {item.label}
                        </s.Item>
                    ))}
                </s.Section>
                <s.Button onClick={handleClick}>메인으로 이동</s.Button>
            </s.Card>
        </s.Container >
    );
}