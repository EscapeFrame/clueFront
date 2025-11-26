import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAccessToken";
import useQuizSocket from "@/app/hooks/useQuizSocket";

import JoinQuiz from "@/entities/Quiz/Student/Join";
import Solving from "@/entities/Quiz/Student/Solving";
import AnswerResult from "@/entities/Quiz/Student/AnswerResult";
import FinalResult from "@/entities/Quiz/Student/FinalResult";
import QuizWaiting from "@/entities/Quiz/Student/Waiting";
import { AnswerRevealMessage } from "@/entities/Quiz/model/quiz.model";

type StudentStep =
    | "joinQuiz"
    | "waiting"
    | "question"
    | "result"
    | "answer_revealed" // 정답 공개 (통계 표시)
    | "finish";

type Character = "owl" | "haeyul" | "panda" | "ferret" | "I" | "koala";

type Participant = {
    userId: string;
    username: string;
    score: number;
    correctAnswers: number;
};

type Question = {
    questionNumber: number;
    questionText: string;
    options: string[];
    correctAnswer: number;
    timeLimit: number;
    difficulty: string;
};

type AnswerResult = {
    questionNumber: number;
    isCorrect: boolean;
    points: number;
    status: string;
};

type FinalRanking = {
    rank: number;
    userId: string;
    username: string;
    totalScore: number;
    correctAnswers: number;
    totalQuestions: number;
    accuracy: number;
};

export default function STUQuiz() {
    const { user } = useAuth();
    const { connected, send, subscribe } = useQuizSocket();
    
    const [step, setStep] = useState<StudentStep>("joinQuiz");
    const [roomCode, setRoomCode] = useState("");
    const [character, setCharacter] = useState<Character | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]); // 참가자 목록 추가

    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
    const [answerReveal, setAnswerReveal] = useState<AnswerRevealMessage | null>(null); // 정답 공개 데이터
    const [myRanking, setMyRanking] = useState<FinalRanking | null>(null);

    const [totalQuestions, setTotalQuestions] = useState(10); // 기본값 10
    const [submittedAt, setSubmittedAt] = useState<number>(0);

    // 방 참여 후 구독 설정
    useEffect(() => {
        if (!subscribe || !roomCode || step === "joinQuiz" || !connected) return;

        const subs = [
            // 참가자 목록 구독 추가
            subscribe(
                `/topic/quiz/${roomCode}/participants`,
                (message: unknown) => {
                    console.log("[STU Quiz] Received participant update:", message);
                    const msg = message as { allParticipants?: Participant[] };
                    if (msg.allParticipants) {
                        setParticipants(msg.allParticipants);
                    }
                }
            ),
            // 게임 진행 (문제/정답공개/종료) 구독
            subscribe(
                `/topic/quiz/${roomCode}/game`,
                (message: unknown) => {
                    console.log("[STU Quiz] 📥 게임 메시지 수신:", message);
                    const msg = message as {
                        questionNumber?: number;
                        questionText?: string;
                        options?: string[];
                        timeLimit?: number;
                        difficulty?: string;
                        correctAnswer?: number;
                        explanation?: string;
                        statistics?: { [key: number]: number };
                        totalAnswers?: number;
                        status?: string;
                        finalRankings?: FinalRanking[];
                    };

                    // 퀴즈 시작 카운트다운
                    if (msg.status === "QUIZ_STARTING") {
                        console.log("[STU Quiz] ⏳ 퀴즈 시작 카운트다운...");
                        // 3초 후 첫 문제가 올 예정
                        return;
                    }

                    // 새 문제 시작 (questionText가 null일 수 있으므로 status와 questionNumber로 판단)
                    if (msg.status === "success" && msg.questionNumber && msg.correctAnswer === undefined) {
                        console.log("[STU Quiz] ✅ 새 문제 시작:", msg.questionNumber);
                        console.log("[STU Quiz] questionText:", msg.questionText);
                        console.log("[STU Quiz] options:", msg.options);

                        setCurrentQuestion({
                            questionNumber: msg.questionNumber,
                            questionText: msg.questionText || "문제 텍스트 없음", // null 처리
                            options: msg.options || [],
                            correctAnswer: -1, // 학생은 정답을 모름
                            timeLimit: msg.timeLimit || 30,
                            difficulty: msg.difficulty || "Medium",
                        });
                        setStep("question");
                        setSelectedAnswer(null);
                        setAnswerResult(null);
                        setAnswerReveal(null);
                        setSubmittedAt(Date.now());
                    }
                    // 정답 공개
                    else if (msg.correctAnswer !== undefined) {
                        console.log("[STU Quiz] 📊 정답 공개:", msg);
                        setAnswerReveal(msg as AnswerRevealMessage);
                        setStep("answer_revealed");
                    }
                    // 퀴즈 종료
                    else if (msg.status === "finished") {
                        console.log("[STU Quiz] 🏁 퀴즈 종료");
                        const myRank = msg.finalRankings?.find(r => r.userId === user.userId);
                        setMyRanking(myRank || null);
                        setStep("finish");
                    }
                }
            ),
            // 개인 답변 결과 구독
            subscribe(
                `/user/queue/quiz/result`,
                (message: unknown) => {
                    const msg = message as AnswerResult;
                    setAnswerResult(msg);
                    setStep("result");
                }
            ),
            // 에러 메시지 구독
            subscribe(
                `/user/queue/errors`,
                (message: unknown) => {
                    const msg = message as { message?: string };
                    console.error("Quiz error:", msg.message);
                    alert(msg.message || "퀴즈 오류가 발생했습니다.");
                }
            ),
        ];

        return () => {
            subs.forEach((sub) => sub?.unsubscribe());
        };
    }, [roomCode, subscribe, user.userId, connected]);

    // 방 참여 핸들러 (REST API로 먼저 참여 가능 여부 확인)
    const handleJoinRoom = async (code: string) => {
        if (!character || !user.userId) {
            alert("캐릭터를 선택하고 로그인해주세요.");
            return;
        }

        if (!connected) {
            alert("퀴즈 서버에 연결 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        try {
            // REST API로 방 정보 조회
            const roomResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quiz/rooms/${code}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (!roomResponse.ok) {
                alert("방을 찾을 수 없습니다.");
                return;
            }

            const roomData = await roomResponse.json();
            console.log("[STU Quiz] 방 정보 조회:", roomData);

            // 총 문제 개수 설정
            if (roomData.questionCount) {
                setTotalQuestions(roomData.questionCount);
                console.log("[STU Quiz] 총 문제 개수 설정:", roomData.questionCount);
            }

            // 방 참여 가능 여부 확인
            const joinableResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quiz/rooms/${code}/joinable`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            const joinableData = await joinableResponse.json();
            console.log("[STU Quiz] 참여 가능 여부 응답:", joinableData, "타입:", typeof joinableData);

            // 응답이 boolean 또는 { joinable: boolean } 둘 다 처리
            const isJoinable = typeof joinableData === 'boolean' ? joinableData : joinableData.joinable;

            if (!isJoinable) {
                const errorMessage = typeof joinableData === 'object' && joinableData.message
                    ? joinableData.message
                    : "참여할 수 없는 방입니다.";
                alert(errorMessage);
                return;
            }

            setRoomCode(code);

            if (send && connected) {
                // 방 참여 메시지 전송
                send(`/app/quiz/join/${code}`, { userId: user.userId });
                setStep("waiting");
            } else {
                alert("퀴즈 서버 연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
            }
        } catch (error) {
            console.error("방 참여 가능 여부 확인 실패:", error);
            alert("방 정보를 확인하는 중 오류가 발생했습니다.");
        }
    };

    // 답변 제출 핸들러
    const handleSubmitAnswer = (answerIndex: number) => {
        if (!send || !roomCode || !currentQuestion || !connected) {
            console.error('[Quiz] Cannot submit answer: not connected or missing data');
            alert("연결이 끊어졌습니다. 페이지를 새로고침해주세요.");
            return;
        }

        setSelectedAnswer(answerIndex);
        
        const timeSpent = Date.now() - submittedAt;

        // 서버에 답변 제출
        send(`/app/quiz/answer/${roomCode}`, {
            userId: user.userId,
            questionNumber: currentQuestion.questionNumber,
            answerIndex: answerIndex,
            submittedAt: Date.now(),
            timeSpent: timeSpent,
        });
    };

    // 다음 문제로 또는 최종 결과로 이동
    const handleNextAfterResult = () => {
        // 답변 결과 화면에서 다음으로 (서버가 자동으로 다음 문제를 보냄)
        setStep("waiting");
    };

    return (
        <>
            {/* WebSocket 연결 대기 중 */}
            {!connected && step !== "joinQuiz" && (
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

            {/* 퀴즈 참여 */}
            {step === "joinQuiz" && (
                <JoinQuiz
                    character={character}
                    onSelectCharacter={(ch: Character) => setCharacter(ch)}
                    onSubmit={handleJoinRoom}
                />
            )}

            {/* 문제 대기 */}
            {connected && step === "waiting" && (
                <QuizWaiting character={character} roomCode={roomCode} participants={participants} />
            )}

            {/* 문제 풀이 */}
            {connected && step === "question" && currentQuestion && (
                <Solving
                    question={{
                        id: `q${currentQuestion.questionNumber}`,
                        type: "multiple",
                        question: currentQuestion.questionText,
                        options: currentQuestion.options,
                        correctIndex: -1, // 학생은 정답을 모름
                    }}
                    onSubmitAnswer={handleSubmitAnswer}
                    currentQuestionNumber={currentQuestion.questionNumber}
                    totalQuestions={totalQuestions}
                    timePerQuestion={currentQuestion.timeLimit}
                />
            )}

            {/* 문제 정답 결과 화면 */}
            {connected && step === "result" && currentQuestion && answerResult && (
                <AnswerResult
                    question={{
                        id: `q${currentQuestion.questionNumber}`,
                        type: "multiple",
                        question: currentQuestion.questionText,
                        options: currentQuestion.options,
                        correctIndex: answerResult.isCorrect ? (selectedAnswer ?? -1) : -1,
                    }}
                    selectedAnswer={selectedAnswer}
                    current={currentQuestion.questionNumber}
                    total={totalQuestions}
                    onNext={handleNextAfterResult}
                />
            )}

            {/* 정답 공개 화면 (선생님이 정답 확인 누른 후) */}
            {connected && step === "answer_revealed" && currentQuestion && answerReveal && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h2>문제 {answerReveal.questionNumber}/{totalQuestions}</h2>
                    <h3>{currentQuestion.questionText}</h3>

                    <div style={{
                        margin: '20px 0',
                        padding: '15px',
                        background: answerReveal.correctAnswer === selectedAnswer ? '#d4edda' : '#f8d7da',
                        borderRadius: '8px',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <strong>
                            {answerReveal.correctAnswer === selectedAnswer ? '✅ 정답입니다!' : '❌ 오답입니다'}
                        </strong>
                    </div>

                    <div style={{
                        margin: '10px 0',
                        padding: '15px',
                        background: '#e7f3ff',
                        borderRadius: '8px',
                        width: '100%'
                    }}>
                        <strong>정답:</strong> {answerReveal.correctAnswer + 1}번 - {currentQuestion.options[answerReveal.correctAnswer]}
                    </div>

                    {answerReveal.explanation && (
                        <div style={{
                            margin: '10px 0',
                            padding: '15px',
                            background: '#f0f0f0',
                            borderRadius: '8px',
                            width: '100%'
                        }}>
                            <strong>설명:</strong> {answerReveal.explanation}
                        </div>
                    )}

                    <h4 style={{ marginTop: '20px' }}>응답 통계</h4>
                    <div style={{ width: '100%' }}>
                        {currentQuestion.options.map((opt, idx) => {
                            const count = answerReveal.statistics[idx] || 0;
                            const percentage = answerReveal.totalAnswers > 0
                                ? ((count / answerReveal.totalAnswers) * 100).toFixed(1)
                                : '0.0';
                            const isCorrect = idx === answerReveal.correctAnswer;
                            const isMyAnswer = idx === selectedAnswer;

                            return (
                                <div key={idx} style={{
                                    margin: '10px 0',
                                    padding: '10px',
                                    background: isCorrect ? '#d4edda' : isMyAnswer ? '#fff3cd' : '#fff',
                                    border: `2px solid ${isCorrect ? '#28a745' : isMyAnswer ? '#ffc107' : '#ddd'}`,
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <span>
                                            {idx + 1}. {opt}
                                            {isMyAnswer && ' ← 내 답'}
                                            {isCorrect && ' ✓'}
                                        </span>
                                        <span><strong>{count}명 ({percentage}%)</strong></span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '20px',
                                        background: '#e0e0e0',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            background: isCorrect ? '#28a745' : isMyAnswer ? '#ffc107' : '#6c757d',
                                            transition: 'width 0.5s'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p style={{ marginTop: '20px', color: '#6c757d' }}>
                        다음 문제를 기다리는 중...
                    </p>
                </div>
            )}

            {/* 모든 문제 완료(결과) */}
            {connected && step === "finish" && myRanking && (
                <FinalResult
                    character={character || "panda"}
                    ranking={myRanking.rank}
                    score={myRanking.totalScore}
                    correctCount={myRanking.correctAnswers}
                    totalQuestions={myRanking.totalQuestions}
                />
            )}
        </>
    );
}