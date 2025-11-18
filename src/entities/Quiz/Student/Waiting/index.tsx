import * as s from "./styles";

type Character =
    | "owl"
    | "Haeyul"
    | "panda"
    | "ferret"
    | "I"
    | "koala";

type Props = {
    character: Character | null;
    roomCode: string;
};

export default function QuizWaiting({ character, roomCode }: Props) {
    if (!character) return <p>캐릭터가 선택되지 않았습니다.</p>;

    return (
        <s.Container>
            <s.Card>
                <s.Section>
                    <s.Title>퀴즈 참여 완료!</s.Title>
                    <s.Explanation>선생님이 퀴즈를 시작할 때까지 기다려주세요.</s.Explanation>
                </s.Section>
                
                <s.RoomCode>{roomCode}</s.RoomCode>

                <s.CharacterBox>
                    <img
                        src={`/Paletto/${character}.png`}
                        alt={character}
                        width={150}
                        height={150}
                    />
                </s.CharacterBox>
            </s.Card>
        </s.Container>
    );
}