import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ToggleSwitch from "@/entities/UI/ToggleSwitch";
import * as s from "./styles";

interface CreateQuizProps {
    onCreate?: (quizData: { title: string; bonus: boolean }) => void;
    onCancel?: () => void;
}

export default function CreateQuiz({ onCreate }: CreateQuizProps) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [bonus, setBonus] = useState(false);

    return (
        <s.Container>
            <s.Card>
                <s.Header>
                    <s.Title>퀴즈 생성하기</s.Title>
                    <s.Explanation>학생들이 참여할 퀴즈를 만들어보세요</s.Explanation>
                </s.Header>

                <s.Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="퀴즈명을 입력하세요."
                />

                <s.Section>
                    <s.SectionHeader>
                        <s.SubTitle>보너스 게임</s.SubTitle>
                        <s.SubExplantion>재미 요소를 추가한 방식이예요.</s.SubExplantion>
                    </s.SectionHeader>
                    <ToggleSwitch
                        id="bonus-toggle"
                        checked={bonus}
                        onChange={(val: boolean) => setBonus(val)}
                    />
                </s.Section>

                <s.Buttons>
                    <s.BackButton onClick={() => navigate("/")}>
                            취소
                        </s.BackButton>
                    <s.SubmitButton
                        onClick={() => {
                            if (!title.trim()) return alert("퀴즈명을 입력하세요!");

                            onCreate?.({
                                title,
                                bonus,
                            });
                        }}>
                        퀴즈 생성
                    </s.SubmitButton>
                </s.Buttons>
            </s.Card>
        </s.Container>
    );
}