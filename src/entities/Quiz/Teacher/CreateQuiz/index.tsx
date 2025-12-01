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
    // start as empty inputs so user can type freely
    const [maxParticipantsInput, setMaxParticipantsInput] = useState("");
    const [questionCountInput, setQuestionCountInput] = useState("");
    const [timePerQuestionInput, setTimePerQuestionInput] = useState("");

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
                        type="text"
                        value={maxParticipantsInput}
                        onChange={(e) => setMaxParticipantsInput(e.target.value)}
                        inputMode="numeric"
                        placeholder="예: 30"
                    />
                </s.Section>

                <s.Section>
                    <s.SectionHeader>
                        <s.SubTitle>문항 수</s.SubTitle>
                    </s.SectionHeader>
                    <s.Input
                        type="text"
                        value={questionCountInput}
                        onChange={(e) => setQuestionCountInput(e.target.value)}
                        inputMode="numeric"
                        placeholder="예: 10"
                    />
                </s.Section>

                <s.Section>
                    <s.SectionHeader>
                        <s.SubTitle>문제당 시간 (초)</s.SubTitle>
                    </s.SectionHeader>
                    <s.Input
                        type="text"
                        value={timePerQuestionInput}
                        onChange={(e) => setTimePerQuestionInput(e.target.value)}
                        inputMode="numeric"
                        placeholder="예: 30"
                    />
                </s.Section>

                <s.Buttons>
                    <s.BackButton onClick={() => navigate("/")}>
                            취소
                        </s.BackButton>
                    <s.SubmitButton
                        onClick={() => {
                            if (!title.trim()) return alert("퀴즈명을 입력하세요!");

                            // validate non-empty numeric inputs
                            if (maxParticipantsInput.trim() && !/^-?\d+$/.test(maxParticipantsInput.trim())) {
                                return alert('최대 참가인원은 정수로 입력해주세요');
                            }
                            if (questionCountInput.trim() && !/^-?\d+$/.test(questionCountInput.trim())) {
                                return alert('문항 수는 정수로 입력해주세요');
                            }
                            if (timePerQuestionInput.trim() && !/^-?\d+$/.test(timePerQuestionInput.trim())) {
                                return alert('문제당 시간은 정수(초)로 입력해주세요');
                            }

                            const mp = parseInt(maxParticipantsInput);
                            const qc = parseInt(questionCountInput);
                            const tp = parseInt(timePerQuestionInput);

                            const maxParticipantsVal = Number.isFinite(mp) ? Math.max(1, Math.min(100, mp)) : undefined;
                            const questionCountVal = Number.isFinite(qc) ? Math.max(1, Math.min(50, qc)) : undefined;
                            const timePerQuestionVal = Number.isFinite(tp) ? Math.max(5, Math.min(300, tp)) : undefined;

                            onCreate?.({
                                title,
                                maxParticipants: maxParticipantsVal,
                                questionCount: questionCountVal,
                                timePerQuestion: timePerQuestionVal,
                            });
                        }}>
                        퀴즈 생성
                    </s.SubmitButton>
                </s.Buttons>
            </s.Card>
        </s.Container>
    );
}