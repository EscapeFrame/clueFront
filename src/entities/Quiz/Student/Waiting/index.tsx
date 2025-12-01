import * as s from "./styles";

type Character =
    | "owl"
    | "haeyul"
    | "panda"
    | "ferret"
    | "I"
    | "koala";

type Participant = {
    userId: string;
    username: string;
    score?: number;
    correctAnswers?: number;
    profileImage?: string;
};

type Props = {
    character: Character | null;
    roomCode: string;
    participants?: Participant[];
};

export default function QuizWaiting({ character, roomCode, participants = [] }: Props) {
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

                <s.Section>
                    <s.SubTitle>현재 참가자 ({participants.length}명)</s.SubTitle>
                    {participants.length > 0 ? (
                        <s.ParticipantList>
                            {participants.map((p) => (
                                <s.ParticipantItem key={p.userId}>
                                    <s.ParticipantImage
                                        src={p.profileImage || '/Paletto/panda.png'}
                                        alt={p.username}
                                    />
                                    {p.username}
                                </s.ParticipantItem>
                            ))}
                        </s.ParticipantList>
                    ) : (
                        <s.EmptyText>참가자를 기다리는 중...</s.EmptyText>
                    )}
                </s.Section>
            </s.Card>
        </s.Container>
    );
}