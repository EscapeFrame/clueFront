import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAccessToken";
import useQuizSocket from "@/app/hooks/useQuizSocket";

import JoinQuiz from "@/entities/Quiz/Student/Join";
import Solving from "@/entities/Quiz/Student/Solving";
import AnswerResult from "@/entities/Quiz/Student/AnswerResult";
import FinalResult from "@/entities/Quiz/Student/FinalResult";
import QuizWaiting from "@/entities/Quiz/Student/Waiting";

type StudentStep =
    | "joinQuiz"
    | "waiting"
    | "question"
    | "result"
    | "finish";

type Character = "owl" | "haeyul" | "panda" | "ferret" | "I" | "koala";

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
    const { send, subscribe } = useQuizSocket();
    
    const [step, setStep] = useState<StudentStep>("joinQuiz");
    const [roomCode, setRoomCode] = useState("");
    const [character, setCharacter] = useState<Character | null>(null);

    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
    const [myRanking, setMyRanking] = useState<FinalRanking | null>(null);

    const [totalQuestions] = useState(10);
    const [submittedAt, setSubmittedAt] = useState<number>(0);

    // 방 참여 후 구독 설정
    useEffect(() => {
        if (!subscribe || !roomCode || step === "joinQuiz") return;

        const subs = [
            // 게임 진행 (문제/종료) 구독
            subscribe(
                `/topic/quiz/${roomCode}/game`,
                (message: unknown) => {
                    const msg = message as { 
                        questionNumber?: number;
                        questionText?: string;
                        options?: string[];
                        timeLimit?: number;
                        difficulty?: string;
                        status?: string;
                        finalRankings?: FinalRanking[];
                    };
                    
                    if (msg.status === "success" && msg.questionText) {
                        // 새 문제 받음
                        setCurrentQuestion({
                            questionNumber: msg.questionNumber || 1,
                            questionText: msg.questionText,
                            options: msg.options || [],
                            correctAnswer: -1, // 학생은 정답을 모름
                            timeLimit: msg.timeLimit || 30,
                            difficulty: msg.difficulty || "Medium",
                        });
                        setStep("question");
                        setSelectedAnswer(null);
                        setAnswerResult(null);
                        setSubmittedAt(Date.now());
                    } else if (msg.status === "finished") {
                        // 퀴즈 종료
                        const myRank = msg.finalRankings?.find(r => r.userId === user.userId);
                        setMyRanking(myRank || null);
                        setStep("finish");
                    }
                }
            ),
            // 개인 답변 결과 구독
            subscribe(
                `/queue/quiz/result`,
                (message: unknown) => {
                    const msg = message as AnswerResult;
                    setAnswerResult(msg);
                    setStep("result");
                }
            ),
            // 에러 메시지 구독
            subscribe(
                `/queue/errors`,
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
    }, [roomCode, subscribe, step, user.userId]);

    // 방 참여 핸들러
    const handleJoinRoom = (code: string) => {
        if (!character || !user.userId) {
            alert("캐릭터를 선택하고 로그인해주세요.");
            return;
        }

        setRoomCode(code);
        
        if (send) {
            // 방 참여 메시지 전송
            send(`/app/quiz/join/${code}`, { userId: user.userId });
            setStep("waiting");
        }
    };

    // 답변 제출 핸들러
    const handleSubmitAnswer = (answerIndex: number) => {
        if (!send || !roomCode || !currentQuestion) return;

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
            {/* 퀴즈 참여 */}
            {step === "joinQuiz" && (
                <JoinQuiz
                    character={character}
                    onSelectCharacter={(ch: Character) => setCharacter(ch)}
                    onSubmit={handleJoinRoom}
                />
            )}

            {/* 문제 대기 */}
            {step === "waiting" && (
                <QuizWaiting character={character} roomCode={roomCode} />
            )}

            {/* 문제 풀이 */}
            {step === "question" && currentQuestion && (
                <Solving
                    question={{
                        id: `q${currentQuestion.questionNumber}`,
                        type: "multiple",
                        question: currentQuestion.questionText,
                        options: currentQuestion.options,
                        correctIndex: -1, // 학생은 정답을 모름
                    }}
                    onSubmitAnswer={handleSubmitAnswer}
                />
            )}

            {/* 문제 정답 결과 화면 */}
            {step === "result" && currentQuestion && answerResult && (
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

            {/* 모든 문제 완료(결과) */}
            {step === "finish" && myRanking && (
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