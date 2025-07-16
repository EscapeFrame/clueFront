"use client"

import { QuizCard } from "./QuizCard"
import { GroupSection, CardGrid } from "./styles"
import type { QuizType } from "@/shared/types/quiz"

interface QuizGroupProps {
  quizzes: QuizType[]
  onComplete: (quizId: string, score: number) => void
}

export function QuizGroup({ quizzes, onComplete }: QuizGroupProps) {
  return (
    <GroupSection>
      <CardGrid>
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.quizId} data={quiz} onComplete={onComplete} />
        ))}
      </CardGrid>
    </GroupSection>
  )
}