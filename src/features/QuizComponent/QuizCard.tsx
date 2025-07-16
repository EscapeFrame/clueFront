"use client"

import { useState, useEffect } from "react"
import { Clock, BookOpen, CheckCircle, PlayCircle, Trophy, AlertCircle } from "lucide-react"
import type { QuizType } from "@/shared/types/quiz"
import * as s from "./styles"

interface QuizCardProps {
  data: QuizType
  onComplete: (quizId: string, score: number) => void
}

export function QuizCard({ data, onComplete }: QuizCardProps) {
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(data.timeLimit * 60)
  const [timerActive, setTimerActive] = useState(false)

  const currentQuestion = data.questions[currentQuestionIndex]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timerActive && timeLeft > 0 && !quizCompleted) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setTimerActive(false)
            handleSubmitQuiz()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, timeLeft, quizCompleted])

  const handleStartQuiz = () => {
    setShowQuizModal(true)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setQuizCompleted(false)
    setScore(0)
    setTimeLeft(data.timeLimit * 60)
    setTimerActive(true)
  }

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNextQuestion = () => {
    const currentQuestionId = data.questions[currentQuestionIndex].questionId
    if (userAnswers[currentQuestionId] === undefined) {
      alert("선택지를 고른 후 넘어갈 수 있습니다.")
      return
    }

    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmitQuiz = () => {
    const currentQuestionId = data.questions[currentQuestionIndex].questionId
    if (userAnswers[currentQuestionId] === undefined) {
      alert("선택지를 고른 후 제출할 수 있습니다.")
      return
    }

    setTimerActive(false)

    let correctAnswers = 0
    data.questions.forEach((question) => {
      if (userAnswers[question.questionId] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / data.questions.length) * 100)
    setScore(finalScore)
    setQuizCompleted(true)
    onComplete(data.quizId, finalScore)
  }

  const closeModal = () => {
    setShowQuizModal(false)
    setQuizCompleted(false)
    setTimerActive(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <>
      <s.Card>
        <s.Header>
          <s.Title>{data.title}</s.Title>
          {data.isCompleted ? (
            <s.StatusCompleted>
              <CheckCircle size={16} />
              완료됨
            </s.StatusCompleted>
          ) : (
            <s.StatusPending>
              <AlertCircle size={16} />
              미완료
            </s.StatusPending>
          )}
        </s.Header>

        <s.Details>
          <s.DetailItem>
            <BookOpen size={16} />
            <s.DetailText>{data.description}</s.DetailText>
          </s.DetailItem>
          <s.DetailItem>
            <Clock size={16} />
            <s.DetailText>제한시간: {data.timeLimit}분</s.DetailText>
          </s.DetailItem>
          <s.DetailItem>
            <Trophy size={16} />
            <s.DetailText>문제 수: {data.questions.length}개</s.DetailText>
          </s.DetailItem>
          <s.DifficultyBadge difficulty={data.difficulty}>
            {data.difficulty.toUpperCase()}
          </s.DifficultyBadge>
        </s.Details>

        {data.isCompleted && data.score !== undefined && (
          <s.ScoreBanner>
            <Trophy size={20} />
            <s.ScoreText>점수: {data.score}점</s.ScoreText>
          </s.ScoreBanner>
        )}

        <s.StartButton completed={data.isCompleted} onClick={handleStartQuiz}>
          <PlayCircle size={16} />
          {data.isCompleted ? "다시 풀기" : "퀴즈 시작"}
        </s.StartButton>
      </s.Card>

      {showQuizModal && (
        <s.ModalOverlay>
          <s.ModalContainer>
            <s.ModalContent>
              {!quizCompleted ? (
                <>
                  <s.ModalHeader>
                    <s.ModalTitle>{data.title}</s.ModalTitle>
                    <s.ModalInfo>
                      <s.TimeLeft timeLeft={timeLeft}>
                        <Clock size={16} />
                        {formatTime(timeLeft)}
                      </s.TimeLeft>
                      <s.QuestionCounter>
                        {currentQuestionIndex + 1} / {data.questions.length}
                      </s.QuestionCounter>
                    </s.ModalInfo>
                  </s.ModalHeader>

                  <s.ProgressBar>
                    <s.Progress
                      style={{ width: `${((currentQuestionIndex + 1) / data.questions.length) * 100}%` }}
                    />
                  </s.ProgressBar>

                  <s.QuestionSection>
                    <s.QuestionTitle>{currentQuestion.question}</s.QuestionTitle>
                    <s.OptionsList>
                      {currentQuestion.options.map((option, index) => (
                        <s.OptionButton
                          key={index}
                          onClick={() => handleAnswerSelect(currentQuestion.questionId, index)}
                          selected={userAnswers[currentQuestion.questionId] === index}
                        >
                          <s.OptionNumber>{index + 1}.</s.OptionNumber> {option}
                        </s.OptionButton>
                      ))}
                    </s.OptionsList>
                  </s.QuestionSection>

                  <s.NavigationButtons>
                    <s.NavButton disabled={currentQuestionIndex === 0} onClick={handlePrevQuestion}>
                      이전
                    </s.NavButton>

                    {currentQuestionIndex === data.questions.length - 1 ? (
                      <s.SubmitButton onClick={handleSubmitQuiz}>제출하기</s.SubmitButton>
                    ) : (
                      <s.NextButton onClick={handleNextQuestion}>다음</s.NextButton>
                    )}
                  </s.NavigationButtons>
                </>
              ) : (
                <s.ResultSection>
                  <Trophy size={64} />
                  <s.ResultTitle>퀴즈 완료!</s.ResultTitle>
                  <s.ResultScore>점수: {score}점 / 100점</s.ResultScore>
                  <s.ResultDetail>
                    {data.questions.length}문제 중 {Math.round((score / 100) * data.questions.length)}문제 정답
                  </s.ResultDetail>
                  <s.CloseButton onClick={closeModal}>닫기</s.CloseButton>
                </s.ResultSection>
              )}
            </s.ModalContent>
          </s.ModalContainer>
        </s.ModalOverlay>
      )}
    </>
  )
}