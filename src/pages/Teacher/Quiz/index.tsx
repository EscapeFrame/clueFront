import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useQuizSocket from "@/app/hooks/useQuizSocket";
import { Overlay, ModalBox, Spinner, Message } from './styles';

 

import CreateQuiz from "@/entities/Quiz/Teacher/CreateQuiz";
import WaitingRoom from "@/entities/Quiz/Teacher/WaitingRoom";
import QuizPlaying from "@/entities/Quiz/Teacher/QuizPlaying";
import QuizResult from "@/entities/Quiz/Teacher/QuizResult";
import FinalRanking from "@/entities/Quiz/Teacher/Ranking/Final";
import {
    Participant,
    Question,
    Ranking,
    AnswerRevealMessage,
} from "@/entities/Quiz/model/quiz.model";

type TeacherStep =
    | "create" // 퀴즈 생성
    | "waiting" // 대기실
    | "question" // 문제 출제
    | "answer_revealed" // 정답 공개 (통계 표시)
    | "ranking" // 랭킹
    | "finish"; // 종료

export default function TCHQuiz() {
    const params = useParams();
    const [step, setStep] = useState<TeacherStep>("create");
    const [roomCode, setRoomCode] = useState(""); // 방 코드
    const [participants, setParticipants] = useState<Participant[]>([]); // 참가자 목록
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null); // 현재 질문
    const [totalQuestions, setTotalQuestions] = useState(10); // 총 문제 수
    const [currentRanking, setCurrentRanking] = useState<Ranking[]>([]); // 현재 랭킹
    const [finalRanking, setFinalRanking] = useState<Ranking[]>([]); // 최종 랭킹
    const [answerReveal, setAnswerReveal] = useState<AnswerRevealMessage | null>(null); // 정답 공개 데이터
    const [quizSettings, setQuizSettings] = useState({
        maxParticipants: 30,
        questionCount: 10,
        timePerQuestion: 30,
    });
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);
    const { connected, send, subscribe } = useQuizSocket();

    // URL 파라미터에서 classRoomId와 documentId 가져오기
    // 예: /class/:classRoomId/:documentId/quiz
    const classRoomId = params.classRoomId;
    const documentId = params.documentId;

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

        console.log("[TCH Quiz] Setting up /topic/quiz/rooms subscription");

        const sub = subscribe("/topic/quiz/rooms", (message: unknown) => {
            console.log("[TCH Quiz] ✅ Received room creation message:", message);
            const msg = message as {
                roomCode?: string;
                status?: string;
                questionCount?: number;
                maxParticipants?: number;
                timePerQuestion?: number;
            };
            console.log("[TCH Quiz] roomCode:", msg?.roomCode);
            console.log("[TCH Quiz] questionCount:", msg?.questionCount);
            console.log("[TCH Quiz] status:", msg?.status);

            if (msg?.roomCode) {
                console.log("[TCH Quiz] Setting roomCode and moving to waiting");
                setRoomCode(msg.roomCode);

                setIsCreatingRoom(false);

                // 서버에서 받은 실제 문제 개수로 업데이트
                if (msg.questionCount) {
                    console.log("[TCH Quiz] 📊 서버 응답 문제 개수로 업데이트:", msg.questionCount);
                    setTotalQuestions(msg.questionCount);
                    setQuizSettings(prev => ({
                        ...prev,
                        questionCount: msg.questionCount!
                    }));
                }

                setStep("waiting");
            } else {
                console.warn("[TCH Quiz] ⚠️ No roomCode in message!");
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
                    console.log("[TCH Quiz] Received participant update:", message);
                    const msg = message as { allParticipants?: Participant[] };
                    if (msg.allParticipants) {
                        setParticipants(msg.allParticipants);
                    }
                }
            ),
            // 게임 진행 (문제/정답공개/종료)
            subscribe(
                `/topic/quiz/${roomCode}/game`,
                (message: unknown) => {
                    console.log("[TCH Quiz] 📥 게임 메시지 수신:", message);
                    const msg = message as Question & AnswerRevealMessage & { status?: string; finalRankings?: Ranking[] };

                    // 퀴즈 시작 카운트다운
                    if (msg.status === "QUIZ_STARTING") {
                        console.log("[TCH Quiz] ⏳ 퀴즈 시작 카운트다운...");
                        // 3초 후 첫 문제가 올 예정
                        return;
                    }

                    // 새 문제 시작 (questionText가 null일 수 있으므로 status와 questionNumber로 판단)
                    if (msg.status === "success" && msg.questionNumber && msg.correctAnswer === undefined) {
                        console.log("[TCH Quiz] ✅ 새 문제 시작:", msg.questionNumber);
                        console.log("[TCH Quiz] questionText:", msg.questionText);
                        console.log("[TCH Quiz] options:", msg.options);

                        setCurrentQuestion({
                            questionNumber: msg.questionNumber,
                            questionText: msg.questionText || "문제 텍스트 없음", // null 처리
                            options: msg.options || [],
                            timeLimit: msg.timeLimit || 30,
                            difficulty: msg.difficulty || "Medium",
                            correctAnswer: msg.correctAnswer,
                        } as Question);
                        setAnswerReveal(null);
                        setStep("question");
                    }
                    // 정답 공개
                    else if (msg.correctAnswer !== undefined) {
                        console.log("[TCH Quiz] 📊 정답 공개:", msg);
                        setAnswerReveal(msg as AnswerRevealMessage);
                        setStep("answer_revealed");
                    }
                    // 퀴즈 종료
                    else if (msg.status === "finished") {
                        console.log("[TCH Quiz] 🏁 퀴즈 종료");
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
                        console.log("[TCH Quiz] 📝 퀴즈 생성 요청:", qs);

                        const questionCount = qs.questionCount ?? 10;
                        const maxParticipants = qs.maxParticipants ?? 30;
                        const timePerQuestion = qs.timePerQuestion ?? 30;

                        console.log("[TCH Quiz] 📊 설정값:", {
                            questionCount,
                            maxParticipants,
                            timePerQuestion
                        });

                        setTotalQuestions(questionCount);
                        setQuizSettings({
                            maxParticipants,
                            questionCount,
                            timePerQuestion,
                        });

                        // send create room via websocket if available
                        if (!send || !connected) {
                            alert("퀴즈 서버 연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
                            return;
                        }

                        // Build payload matching backend CreateRoomRequest DTO
                        const payload = {
                            maxParticipants,
                            questionCount,
                            timePerQuestion,
                            // UUIDs expected as strings
                            classRoomId: classRoomId ?? undefined,
                            documentId: documentId ?? undefined,
                        };

                        console.log("[TCH Quiz] 📤 서버로 전송할 payload:", payload);

                        // server expects connect to /ws-quiz then app destination /app/quiz/create
                        setIsCreatingRoom(true);
                        send("/app/quiz/create", payload);
                    }}
                />
            )}

            {/* 방 생성 요청 대기 로딩 오버레이 */}
                        {isCreatingRoom && (
                                <Overlay>
                                        <ModalBox>
                                                <Spinner />
                                                <Message>방을 생성중입니다... 잠시만 기다려주세요.</Message>
                                        </ModalBox>
                                </Overlay>
                        )}

            {/* 대기실 */}
            {connected && step === "waiting" && (
                <WaitingRoom
                    roomCode={roomCode}
                    initialMembers={participants.length}
                    initialQuestions={quizSettings.questionCount}
                    initialTime={quizSettings.timePerQuestion}
                    students={participants.map(p => ({
                        id: p.userId,
                        name: p.username,
                        character: "panda", // 기본값
                        score: p.score ?? 0,
                        correct: p.correctAnswers ?? 0,
                    }))}
                    onStart={() => {
                        console.log("[TCH Quiz] 퀴즈 시작 버튼 클릭");
                        console.log("[TCH Quiz] connected:", connected);
                        console.log("[TCH Quiz] send:", !!send);
                        console.log("[TCH Quiz] roomCode:", roomCode);

                        if (!send || !roomCode || !connected) {
                            console.error("[TCH Quiz] ❌ 퀴즈 시작 실패 - 연결 상태 확인 필요");
                            alert("연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
                            return;
                        }

                        console.log("[TCH Quiz] 📤 퀴즈 시작 메시지 전송:", `/app/quiz/start/${roomCode}`);
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
                    onShowResult={() => {
                        if (!send || !roomCode || !connected) {
                            alert("연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
                            return;
                        }
                        // 정답 공개 요청 (통계 포함)
                        send(`/app/quiz/reveal-answer/${roomCode}`, {});
                    }}
                    totalStudents={participants.length}
                    currentQuestionNumber={currentQuestion.questionNumber}
                    totalQuestions={totalQuestions}
                    timePerQuestion={quizSettings.timePerQuestion}
                />
            )}

            {/* 정답 공개 (통계 표시) */}
            {connected && step === "answer_revealed" && currentQuestion && answerReveal && (
                <QuizResult
                    question={{
                        id: `q${currentQuestion.questionNumber}`,
                        question: currentQuestion.questionText,
                        options: currentQuestion.options,
                        correctIndex: answerReveal.correctAnswer,
                    } as Question & { id: string; question: string; correctIndex: number }}
                    current={answerReveal.questionNumber}
                    total={totalQuestions}
                    statistics={answerReveal.statistics}
                    explanation={answerReveal.explanation}
                    students={[]} // 통계는 서버에서 제공됨
                    onSubmit={() => {
                        if (!send || !roomCode || !connected) {
                            alert("연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
                            return;
                        }
                        // 다음 문제로 이동
                        send(`/app/quiz/next/${roomCode}`, {});
                    }}
                    onShowRanking={() => {
                        if (!send || !roomCode || !connected) {
                            alert("연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
                            return;
                        }
                        // 랭킹 조회
                        send(`/app/quiz/rankings/${roomCode}`, {});
                        setStep("ranking");
                    }}
                />
            )}

            {/* 랭킹 화면 */}
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