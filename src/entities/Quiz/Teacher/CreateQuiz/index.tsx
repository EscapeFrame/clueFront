import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as s from "./styles";

interface CreateQuizProps {
    onCreate?: (quizData: {
        title: string;
        maxParticipants?: number;
        questionCount?: number;
        timePerQuestion?: number;
        classRoomId?: string;
        documentId?: string;
    }) => void;
    onCancel?: () => void;
}

export default function CreateQuiz({ onCreate }: CreateQuizProps) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [maxParticipants, setMaxParticipants] = useState(30);
    const [questionCount, setQuestionCount] = useState(10);
    const [timePerQuestion, setTimePerQuestion] = useState(30);

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
                        <s.SubTitle>최대 참가인원</s.SubTitle>
                    </s.SectionHeader>
                    <s.Input
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="100"
                    />
                </s.Section>

                <s.Section>
                    <s.SectionHeader>
                        <s.SubTitle>문항 수</s.SubTitle>
                    </s.SectionHeader>
                    <s.Input
                        type="number"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="50"
                    />
                </s.Section>

                <s.Section>
                    <s.SectionHeader>
                        <s.SubTitle>문제당 시간 (초)</s.SubTitle>
                    </s.SectionHeader>
                    <s.Input
                        type="number"
                        value={timePerQuestion}
                        onChange={(e) => setTimePerQuestion(Math.max(5, parseInt(e.target.value) || 5))}
                        min="5"
                        max="300"
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
                                maxParticipants,
                                questionCount,
                                timePerQuestion,
                            });
                        }}>
                        퀴즈 생성
                    </s.SubmitButton>
                </s.Buttons>
            </s.Card>
        </s.Container>
    );
}