import { useState, useEffect } from "react";
import useQuizSocket from "@/app/hooks/useQuizSocket";

import CreateQuiz from "@/entities/Quiz/Teacher/CreateQuiz";
import WaitingRoom from "@/entities/Quiz/Teacher/WaitingRoom";
import QuizPlaying from "@/entities/Quiz/Teacher/QuizPlaying";
import QuizResult from "@/entities/Quiz/Teacher/QuizResult";
import FinalRanking from "@/entities/Quiz/Teacher/Ranking/Final";
import {
    Participant,
    Question,
    Ranking,
} from "@/entities/Quiz/model/quiz.model";

type TeacherStep =
    | "create" // 퀴즈 생성
    | "waiting" // 대기실
    | "question" // 문제 출제
    | "ranking" // 정답공개 + 랭킹
    | "finish"; // 종료

export default function TCHQuiz() {
    const [step, setStep] = useState<TeacherStep>("create");
    const [roomCode, setRoomCode] = useState(""); // 방 코드
    const [participants, setParticipants] = useState<Participant[]>([]); // 참가자 목록
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null); // 현재 질문
    const [totalQuestions, setTotalQuestions] = useState(10); // 총 문제 수
    const [currentRanking, setCurrentRanking] = useState<Ranking[]>([]); // 현재 랭킹
    const [finalRanking, setFinalRanking] = useState<Ranking[]>([]); // 최종 랭킹

    const { connected, send, subscribe } = useQuizSocket();

    type CreatePayload = {
        title: string;
        maxParticipants?: number;
        questionCount?: number;
        timePerQuestion?: number;
        classRoomId?: string;
        documentId?: string;
    };

    // 1. 방 생성 구독 (마운트 시 한 번만)
    useEffect(() => {
        if (!subscribe) return;

        const sub = subscribe("/topic/quiz/rooms", (msg: any) => {
            if (msg?.roomCode) {
                setRoomCode(msg.roomCode);
                setStep("waiting");
            }
        });

        return () => sub?.unsubscribe();
    }, [subscribe]);

    // 2. 게임 진행 관련 구독 (roomCode가 생겼을 때)
    useEffect(() => {
        if (!subscribe || !roomCode) return;

        const subs = [
            // 참가자 목록
            subscribe(
                `/topic/quiz/${roomCode}/participants`,
                (msg: { allParticipants: Participant[] }) => {
                    setParticipants(msg.allParticipants);
                }
            ),
            // 게임 진행 (문제/종료)
            subscribe(
                `/topic/quiz/${roomCode}/game`,
                (msg: Question & { status: string; finalRankings?: Ranking[] }) => {
                    if (msg.status === "success") {
                        setCurrentQuestion(msg);
                        setStep("question");
                    } else if (msg.status === "finished") {
                        setFinalRanking(msg.finalRankings ?? []);
                        setStep("finish");
                    }
                }
            ),
            // 랭킹 업데이트
            subscribe(
                `/topic/quiz/${roomCode}/rankings`,
                (msg: { rankings: Ranking[] }) => {
                    setCurrentRanking(msg.rankings);
                }
            ),
        ];

        return () => {
            subs.forEach((sub) => sub?.unsubscribe());
        };
    }, [roomCode, subscribe]);

    return (
        <>
            {/* 퀴즈 생성 */}
            {step === "create" && (
                <CreateQuiz
                    onCreate={(qs: CreatePayload) => {
                        const questionCount = qs.questionCount ?? 10;
                        setTotalQuestions(questionCount);

                        // send create room via websocket if available
                        if (send) {
                            const payload = {
                                title: qs.title,
                                topic: qs.title,
                                maxParticipants: qs.maxParticipants ?? 30,
                                questionCount: questionCount,
                                timePerQuestion: qs.timePerQuestion ?? 30,
                                classRoomId: qs.classRoomId,
                                documentId: qs.documentId,
                            };

                            // server expects connect to /ws-quiz then app destination /app/quiz/create
                            send("/app/quiz/create", payload);
                        }
                    }}
                />
            )}

            {/* 대기실 */}
            {step === "waiting" && (
                <WaitingRoom
                    roomCode={roomCode}
                    students={participants}
                    onStart={() => {
                        if (send && roomCode) {
                            send(`/app/quiz/start/${roomCode}`, {});
                        }
                    }}
                />
            )}

            {/* 문제 출제 화면(선생님용) */}
            {step === "question" && currentQuestion && (
                <QuizPlaying
                    question={currentQuestion}
                    onShowResult={() => setStep("ranking")}
                    totalStudents={participants.length}
                />
            )}

            {/* 정답 공개 + 랭킹 */}
            {step === "ranking" && currentQuestion && (
                <QuizResult
                    question={currentQuestion}
                    current={currentQuestion.questionNumber}
                    total={totalQuestions}
                    students={currentRanking}
                    onSubmit={() => {
                        if (send && roomCode) {
                            send(`/app/quiz/next/${roomCode}`, {});
                        }
                    }}
                />
            )}

            {/* 퀴즈 종료 후 최종 결과 */}
            {step === "finish" && (
                <FinalRanking
                    students={finalRanking}
                    onRestart={() => {
                        setStep("create");
                        setParticipants([]);
                        setCurrentQuestion(null);
                        setRoomCode("");
                    }}
                />
            )}
        </>
    );
}