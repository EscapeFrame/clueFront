export interface QuizType {
  quizId: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  timeLimit: number // 분 단위
  questions: QuestionType[]
  createdAt: string
  isCompleted: boolean
  score?: number
  totalQuestions: number
}

export interface QuestionType {
  questionId: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  userAnswer?: number
}

export interface QuizSubmissionType {
  quizId: string
  answers: { questionId: string; answer: number }[]
  completedAt: string
}