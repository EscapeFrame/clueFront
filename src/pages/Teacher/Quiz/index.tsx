import { useState, useEffect } from "react";
import useQuizSocket from "@/app/hooks/useQuizSocket";

import CreateQuiz from "@/entities/Quiz/Teacher/CreateQuiz";
import WaitingRoom from "@/entities/Quiz/Teacher/WaitingRoom";
import QuizPlaying from "@/entities/Quiz/Teacher/QuizPlaying";
import QuizResult from "@/entities/Quiz/Teacher/QuizResult";

import { dummyQuestions, dummyStudentAnswers, dummyStudents } from "./dummy";
import FinalRanking from "@/entities/Quiz/Teacher/Ranking/Final";

type TeacherStep =
    | "create"       // 퀴즈 생성
    | "waiting"      // 대기실
    | "question"     // 문제 출제
    | "ranking"      // 정답공개 + 랭킹
    | "finish";      // 종료


type StudentAnswer = {
    id: string;
    name: string;
    answers: Record<string, number>;
};


export default function TCHQuiz() {
    const [step, setStep] = useState<TeacherStep>("create");
    const [questions, setQuestions] = useState(dummyQuestions); // 질문 내용
    const [students, setStudents] = useState(dummyStudents); // 학생 목록
    const [roomCode, setRoomCode] = useState("1234"); // 코드

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLast, setIsLast] = useState(false);

    const [answers, setAnswers] = useState<StudentAnswer[][]>(
        questions.map(() => []) // 문제마다 학생 답 배열 초기화
    );

    const { connected, send, subscribe } = useQuizSocket();

    type CreatePayload = {
        title: string;
        maxParticipants?: number;
        questionCount?: number;
        timePerQuestion?: number;
        classRoomId?: string;
        documentId?: string;
    };

    // subscribe to created room notifications
    useState(() => {});

    // subscribe -> useEffect to manage lifecycle
    useEffect(() => {
        if (!subscribe) return;
        const sub = subscribe('/topic/quiz/rooms', (msg: any) => {
            if (msg?.roomCode) setRoomCode(msg.roomCode);
        });
        const cleanup = () => {
            if (sub) sub.unsubscribe();
        };
        return cleanup;
    }, [subscribe]);

    return (
        <>
            {/* 퀴즈 생성 */}
            {step === "create" && (
                <CreateQuiz
                    onCreate={(qs: CreatePayload) => {
                        // send create room via websocket if available
                        if (send) {
                            const payload = {
                                title: qs.title,
                                topic: qs.title,
                                maxParticipants: qs.maxParticipants ?? 30,
                                questionCount: qs.questionCount ?? 10,
                                timePerQuestion: qs.timePerQuestion ?? 30,
                                classRoomId: qs.classRoomId,
                                documentId: qs.documentId,
                            };

                            // server expects connect to /ws-quiz then app destination /app/quiz/create
                            send("/app/quiz/create", payload);
                        }

                        setQuestions(dummyQuestions);
                        setCurrentIndex(0);
                        setStep("waiting");
                    }}
                />
            )}

            {/* 대기실 */}
            {step === "waiting" && (
                <WaitingRoom
                    roomCode={roomCode}
                    students={students}
                    onStart={() => setStep("question")}
                />
            )}

            {/* 문제 출제 화면(선생님용) */}
            {step === "question" && (
                <QuizPlaying
                    question={questions[currentIndex]}
                    onShowResult={() => setStep("ranking")}
                    totalStudents={students.length}
                />
            )}

            {/* 정답 공개 + 랭킹 */}
            {step === "ranking" && (
                <QuizResult
                    question={questions[currentIndex]}
                    current={currentIndex + 1}
                    total={questions.length}
                    students={answers[currentIndex]}
                    onSubmit={() => {
                        const nextIndex = currentIndex + 1;
                        if (nextIndex >= questions.length) {
                            setStep("finish");
                        } else {
                            setCurrentIndex(nextIndex);
                            setStep("question");
                        }
                    }}
                />
            )}

            {/* 퀴즈 종료 후 최종 결과 */}
            {step === "finish" && (
                <FinalRanking
                    students={students}
                    onRestart={() => {
                        setStep("create");
                        setStudents([]);
                        setCurrentIndex(0);
                    }}
                />
            )}
        </>
    );
}