import { useState } from "react";

import JoinQuiz from "@/entities/Quiz/Student/Join";
import Solving from "@/entities/Quiz/Student/Solving";
import AnswerResult from "@/entities/Quiz/Student/AnswerResult";
import FinalResult from "@/entities/Quiz/Student/FinalResult";
import QuizWaiting from "@/entities/Quiz/Student/Waiting";
import { dummyQuestions } from './dummy';

type StudentStep =
    | "joinQuiz"
    | "question"
    | "result"
    | "finish";

type Character = "owl" | "Haeyul" | "panda" | "ferret" | "I" | "koala";

export default function STUQuiz() {
    const [step, setStep] = useState<StudentStep>("joinQuiz");
    const [roomCode, setRoomCode] = useState("");
    const [character, setCharacter] = useState<Character | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제 순서
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // 학생의 답 저장

    const teacherStarted = true;
    const questions = dummyQuestions;  // 전체 문제 배열
    const isLast = currentIndex === questions.length - 1;

    return (
        <>
            {/* 퀴즈 참여 */}
            {step === "joinQuiz" && (
                <JoinQuiz
                    character={character}
                    onSelectCharacter={(ch: Character) => setCharacter(ch)}
                    onSubmit={(code: string) => {
                        if (!character) return alert("캐릭터를 선택해주세요.");
                        setRoomCode(code);
                        setStep("question");
                    }}
                />
            )}

            {/* 문제 대기 */}
            {step === "question" && !teacherStarted && (
                <QuizWaiting character={character} roomCode={roomCode} />
            )}

            {/* 문제 풀이 */}
            {step === "question" && teacherStarted && (
                <Solving
                    question={questions[currentIndex]}
                    onSubmitAnswer={(answerIndex) => {
                        setSelectedAnswer(answerIndex);
                        setStep("result");
                    }}
                />
            )}

            {/* 문제 정답 결과 화면 */}
            {step === "result" && (
                <AnswerResult
                    question={questions[currentIndex]}
                    selectedAnswer={selectedAnswer}
                    current={currentIndex + 1}
                    total={questions.length}
                    onNext={() => {
                        if (isLast) {
                            setStep("finish");
                        } else {
                            setCurrentIndex((prev) => prev + 1);
                            setStep("question");
                        }
                    }}
                />
            )}

            {/* 모든 문제 완료(결과) */}
            {step === "finish" && (
                <FinalResult
                    character="panda"
                    ranking={3}
                    score={20}
                    correctCount={2}
                    totalQuestions={3}
                />
            )}
        </>
    );
}