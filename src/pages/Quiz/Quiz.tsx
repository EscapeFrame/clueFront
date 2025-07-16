"use client"

import { useState, useEffect } from "react"
import { QuizCard } from "@/features/QuizComponent/QuizCard"
import { quizData } from "@/shared/theme/Quiz/data"
import { LuNotebookPen } from "react-icons/lu";
import {Trophy, Clock } from "lucide-react"
import type { QuizType } from "@/shared/types/quiz"
import * as S from "./styles" 

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<QuizType[]>(quizData)

  const handleQuizComplete = (quizId: string, score: number) => {
    setQuizzes((prev) => prev.map((quiz) => (quiz.quizId === quizId ? { ...quiz, isCompleted: true, score } : quiz)))
  }

  const completedQuizzes = quizzes.filter((quiz) => quiz.isCompleted)
  const pendingQuizzes = quizzes.filter((quiz) => !quiz.isCompleted)
  return (
    <S.PageContainer>
      <S.ContentWrapper>
        {/* 모든 퀴즈 완료 시 축하 메시지 및 버튼 표시 */}
        {completedQuizzes.length === quizzes.length && (
        <S.CompleteSummary>
            <Trophy className="icon-large" />
            <p>모든 퀴즈를 완료했습니다! 🎉</p>
            <button onClick={() => (window.location.href = "/class")}>클래스로 이동</button>
        </S.CompleteSummary>
        )}

        <S.StatsGrid>
          <S.StatCard>
            <S.StatIconWrapper color="#2563EB">
                <LuNotebookPen />
            </S.StatIconWrapper>
            <S.StatLabel>전체 퀴즈</S.StatLabel>
            <S.StatNumber>{quizzes.length}</S.StatNumber>
          </S.StatCard>
          <S.StatCard>
            <S.StatIconWrapper color="#2563EB">
              <Trophy className="icon" />
            </S.StatIconWrapper>
            <S.StatLabel>완료한 퀴즈</S.StatLabel>
            <S.StatNumber>{completedQuizzes.length}</S.StatNumber>
          </S.StatCard>
          <S.StatCard>
            <S.StatIconWrapper color="#2563EB">
              <Clock className="icon" />
            </S.StatIconWrapper>
            <S.StatLabel>대기 중</S.StatLabel>
            <S.StatNumber>{pendingQuizzes.length}</S.StatNumber>
          </S.StatCard>
        </S.StatsGrid>
        {pendingQuizzes.length > 0 && (
          <section>
            <S.SectionTitle>
              <Clock className="icon" />
              풀어야 할 퀴즈
            </S.SectionTitle>
            <S.QuizGrid>
              {pendingQuizzes.map((quiz) => (
                <QuizCard key={quiz.quizId} data={quiz} onComplete={handleQuizComplete} />
              ))}
            </S.QuizGrid>
          </section>
        )}
        {completedQuizzes.length > 0 && (
          <section>
            <S.SectionTitle>
              <Trophy className="icon" />
              완료한 퀴즈
            </S.SectionTitle>
            <S.QuizGrid>
              {completedQuizzes.map((quiz) => (
                <QuizCard key={quiz.quizId} data={quiz} onComplete={handleQuizComplete} />
              ))}
            </S.QuizGrid>
          </section>
        )}
      </S.ContentWrapper>
    </S.PageContainer>
  )
}