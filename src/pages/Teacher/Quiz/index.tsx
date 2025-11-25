import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
    const [searchParams] = useSearchParams();
    const [step, setStep] = useState<TeacherStep>("create");
    const [roomCode, setRoomCode] = useState(""); // 방 코드
    const [participants, setParticipants] = useState<Participant[]>([]); // 참가자 목록
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null); // 현재 질문
    const [totalQuestions, setTotalQuestions] = useState(10); // 총 문제 수
    const [currentRanking, setCurrentRanking] = useState<Ranking[]>([]); // 현재 랭킹
    const [finalRanking, setFinalRanking] = useState<Ranking[]>([]); // 최종 랭킹

    const { connected, send, subscribe } = useQuizSocket();
    
    // URL에서 classRoomId와 documentId 가져오기
    // 예: /quiz?classRoomId=xxx&documentId=yyy
    const classRoomId = searchParams.get('classRoomId') || undefined;
    const documentId = searchParams.get('documentId') || undefined;

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
        if (!subscribe || !connected) return;

        const sub = subscribe("/topic/quiz/rooms", (message: unknown) => {
            const msg = message as { roomCode?: string };
            if (msg?.roomCode) {
                setRoomCode(msg.roomCode);
                setStep("waiting");
            }
        });

        return () => sub?.unsubscribe();
    }, [subscribe, connected]);

    // 2. 게임 진행 관련 구독 (roomCode가 생겼을 때)
    useEffect(() => {
        if (!subscribe || !roomCode || !connected) return;

        const subs = [
            // 참가자 목록
            subscribe(
                `/topic/quiz/${roomCode}/participants`,
                (message: unknown) => {
                    const msg = message as { allParticipants?: Participant[] };
                    if (msg.allParticipants) {
                        setParticipants(msg.allParticipants);
                    }
                }
            ),
            // 게임 진행 (문제/종료)
            subscribe(
                `/topic/quiz/${roomCode}/game`,
                (message: unknown) => {
                    const msg = message as Question & { status?: string; finalRankings?: Ranking[] };
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
                (message: unknown) => {
                    const msg = message as { rankings?: Ranking[] };
                    if (msg.rankings) {
                        setCurrentRanking(msg.rankings);
                    }
                }
            ),
        ];

        return () => {
            subs.forEach((sub) => sub?.unsubscribe());
        };
    }, [roomCode, subscribe, connected]);

    return (
        <>
            {/* WebSocket 연결 대기 중 */}
            {!connected && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontSize: '18px',
                    color: '#6b7280'
                }}>
                    퀴즈 서버에 연결 중...
                </div>
            )}

            {/* 퀴즈 생성 */}
            {connected && step === "create" && (
                <CreateQuiz
                    onCreate={(qs: CreatePayload) => {
                        const questionCount = qs.questionCount ?? 10;
                        setTotalQuestions(questionCount);

                        // send create room via websocket if available
                        if (!send || !connected) {
                            alert("퀴즈 서버 연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
                            return;
                        }
                        
                        // Build payload matching backend CreateRoomRequest DTO
                        const payload = {
                            maxParticipants: qs.maxParticipants ?? 30,
                            questionCount: questionCount,
                            timePerQuestion: qs.timePerQuestion ?? 30,
                            // UUIDs expected as strings
                            classRoomId: classRoomId ?? undefined,
                            documentId: documentId ?? undefined,
                        };

                        // server expects connect to /ws-quiz then app destination /app/quiz/create
                        send("/app/quiz/create", payload);
                    }}
                />
            )}

            {/* 대기실 */}
            {connected && step === "waiting" && (
                <WaitingRoom
                    roomCode={roomCode}
                    students={participants.map(p => ({
                        id: p.userId,
                        name: p.username,
                        character: "panda", // 기본값
                        score: p.score ?? 0,
                        correct: p.correctAnswers ?? 0,
                    }))}
                    onStart={() => {
                        if (!send || !roomCode || !connected) {
                            alert("연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
                            return;
                        }
                        send(`/app/quiz/start/${roomCode}`, {});
                    }}
                />
            )}

            {/* 문제 출제 화면(선생님용) */}
            {connected && step === "question" && currentQuestion && (
                <QuizPlaying
                    question={{
                        id: `q${currentQuestion.questionNumber}`,
                        question: currentQuestion.questionText,
                        options: currentQuestion.options,
                        correctIndex: currentQuestion.correctAnswer ?? 0,
                        questionNumber: currentQuestion.questionNumber,
                        questionText: currentQuestion.questionText,
                        timeLimit: currentQuestion.timeLimit,
                        difficulty: currentQuestion.difficulty,
                    } as Question & { id: string; question: string; correctIndex: number }}
                    onShowResult={() => setStep("ranking")}
                    totalStudents={participants.length}
                />
            )}

            {/* 정답 공개 + 랭킹 */}
            {connected && step === "ranking" && currentQuestion && (
                <QuizResult
                    question={{
                        id: `q${currentQuestion.questionNumber}`,
                        question: currentQuestion.questionText,
                        options: currentQuestion.options,
                        correctIndex: currentQuestion.correctAnswer ?? 0,
                    } as Question & { id: string; question: string; correctIndex: number }}
                    current={currentQuestion.questionNumber}
                    total={totalQuestions}
                    students={currentRanking.map(r => ({
                        id: r.userId,
                        name: r.username,
                        answers: {} as Record<string, number>,
                    }))}
                    onSubmit={() => {
                        if (!send || !roomCode || !connected) {
                            alert("연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
                            return;
                        }
                        send(`/app/quiz/next/${roomCode}`, {});
                    }}
                />
            )}

            {/* 퀴즈 종료 후 최종 결과 */}
            {connected && step === "finish" && (
                <FinalRanking
                    students={finalRanking.map(r => ({
                        id: r.userId,
                        name: r.username,
                        score: r.totalScore,
                        correct: r.correctAnswers,
                        character: "panda", // 기본값
                    }))}
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