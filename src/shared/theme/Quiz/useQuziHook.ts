"use client"

import { useState, useEffect, useCallback } from "react"
import { quizService } from "./QuizApi";
import type { QuizType, QuizSubmissionType } from "@/shared/types/quiz"

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<QuizType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchQuizzes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await quizService.getAllQuizzes()
      setQuizzes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  const submitQuiz = useCallback(
    async (submission: QuizSubmissionType) => {
      setLoading(true)
      setError(null)
      try {
        const result = await quizService.submitQuiz(submission)
        await fetchQuizzes() // 퀴즈 목록 새로고침
        return result
      } catch (err) {
        setError(err instanceof Error ? err.message : "Submission failed")
        throw err
      } finally {
        setLoading(false)
      }
    },
    [fetchQuizzes],
  )

  useEffect(() => {
    fetchQuizzes()
  }, [fetchQuizzes])

  return {
    quizzes,
    loading,
    error,
    fetchQuizzes,
    submitQuiz,
  }
}