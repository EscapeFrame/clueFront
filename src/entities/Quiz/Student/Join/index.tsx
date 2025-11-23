import { useState } from "react";
import * as s from "./styles";
import { CharacterSelector } from "@/widgets/Quiz/CharacterSelector";

type Character = "owl" | "haeyul" | "panda" | "ferret" | "I" | "koala";

type Props = {
    character: Character | null;
    onSelectCharacter: (ch: Character) => void;
    onSubmit: (code: string) => void;
};

export default function JoinQuiz({ character, onSelectCharacter, onSubmit }: Props) {
    const [roomCode, setRoomCode] = useState("");

    const handleSubmit = () => {
        if (!character || !roomCode) return alert("캐릭터와 방 코드를 선택해주세요.");
        onSubmit(roomCode); // 부모로 전달 → step 변경
    };

    return (
        <s.Container>
            <s.Card>
                <s.Section>
                    <s.Title>퀴즈 참여</s.Title>
                    <s.Explanation>학습실 문제 코드 4자를 입력해주세요.</s.Explanation>
                </s.Section>

                <CharacterSelector onSelect={onSelectCharacter} />

                <s.Section>
                    <s.Input
                        type="text"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        placeholder="방 코드를 입력하세요"
                    />
                </s.Section>

                <s.Button onClick={handleSubmit}>참가하기</s.Button>
            </s.Card>
        </s.Container>
    );
}