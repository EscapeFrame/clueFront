import axios from "axios"
import type { QuizType, QuizSubmissionType } from "@/shared/types/quiz"

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Mock API
  timeout: 10000,
})

// Mock 데이터 - 실제 서버 없이도 작동
const mockQuizzes: QuizType[] = [
  {
    quizId: "1",
    title: "React 기초 퀴즈",
    description: "React의 기본 개념을 테스트하는 퀴즈입니다.",
    difficulty: "easy",
    timeLimit: 10,
    totalQuestions: 3,
    isCompleted: false,
    createdAt: "2024-01-15",
    questions: [
      {
        questionId: "1-1",
        question: "React에서 상태를 관리하기 위해 사용하는 Hook은?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation: "useState는 함수형 컴포넌트에서 상태를 관리하는 가장 기본적인 Hook입니다.",
      },
      {
        questionId: "1-2",
        question: "JSX에서 JavaScript 표현식을 사용할 때 감싸는 기호는?",
        options: ["()", "[]", "{}", "<>"],
        correctAnswer: 2,
        explanation: "JSX에서는 중괄호 {}를 사용하여 JavaScript 표현식을 포함시킵니다.",
      },
      {
        questionId: "1-3",
        question: "React 컴포넌트의 생명주기에서 컴포넌트가 마운트된 후 실행되는 Hook은?",
        options: ["useState", "useEffect", "useMemo", "useCallback"],
        correctAnswer: 1,
        explanation:
          "useEffect는 컴포넌트의 생명주기를 관리하며, 빈 의존성 배열과 함께 사용하면 마운트 후 한 번 실행됩니다.",
      },
    ],
  },
  {
    quizId: "2",
    title: "JavaScript ES6+ 퀴즈",
    description: "최신 JavaScript 문법과 기능을 테스트합니다.",
    difficulty: "medium",
    timeLimit: 15,
    totalQuestions: 4,
    isCompleted: false,
    createdAt: "2024-01-10",
    questions: [
      {
        questionId: "2-1",
        question: "화살표 함수와 일반 함수의 차이점은?",
        options: ["this 바인딩", "호이스팅", "arguments 객체", "모든 것"],
        correctAnswer: 3,
        explanation: "화살표 함수는 this 바인딩, 호이스팅, arguments 객체 모든 면에서 일반 함수와 다릅니다.",
      },
      {
        questionId: "2-2",
        question: "구조 분해 할당(Destructuring)의 올바른 사용법은?",
        options: ["const {a, b} = obj", "const [a, b] = obj", "const a, b = obj", "const (a, b) = obj"],
        correctAnswer: 0,
        explanation: "객체 구조 분해 할당은 중괄호 {}를 사용합니다.",
      },
      {
        questionId: "2-3",
        question: "Promise의 상태가 아닌 것은?",
        options: ["pending", "fulfilled", "rejected", "loading"],
        correctAnswer: 3,
        explanation: "Promise는 pending, fulfilled, rejected 세 가지 상태만 가집니다.",
      },
      {
        questionId: "2-4",
        question: "async/await의 장점은?",
        options: ["동기적 코드처럼 작성", "에러 처리 간편", "가독성 향상", "모든 것"],
        correctAnswer: 3,
        explanation: "async/await는 비동기 코드를 동기적으로 작성할 수 있게 하여 가독성과 에러 처리를 개선합니다.",
      },
    ],
  },
  {
    quizId: "3",
    title: "CSS 고급 퀴즈",
    description: "CSS의 고급 기능과 레이아웃을 테스트합니다.",
    difficulty: "hard",
    timeLimit: 20,
    totalQuestions: 3,
    isCompleted: true,
    score: 67,
    createdAt: "2024-01-20",
    questions: [
      {
        questionId: "3-1",
        question: "CSS Grid와 Flexbox의 주요 차이점은?",
        options: ["1차원 vs 2차원", "브라우저 지원", "성능", "문법"],
        correctAnswer: 0,
        explanation: "Flexbox는 1차원 레이아웃, CSS Grid는 2차원 레이아웃을 위한 도구입니다.",
      },
      {
        questionId: "3-2",
        question: "CSS 변수(Custom Properties)의 올바른 선언법은?",
        options: ["$variable: value", "@variable: value", "--variable: value", "var(variable): value"],
        correctAnswer: 2,
        explanation: "CSS 변수는 --로 시작하여 선언하고 var()로 사용합니다.",
      },
      {
        questionId: "3-3",
        question: "position: sticky가 작동하지 않는 경우는?",
        options: ["부모에 overflow: hidden", "top/bottom 값 미설정", "부모 높이 부족", "모든 것"],
        correctAnswer: 3,
        explanation: "sticky는 부모의 overflow, top/bottom 값, 부모 높이 등 여러 조건이 맞아야 작동합니다.",
      },
    ],
  },
  {
    quizId: "4",
    title: "Node.js 백엔드 퀴즈",
    description: "Node.js와 백엔드 개발 지식을 테스트합니다.",
    difficulty: "medium",
    timeLimit: 12,
    totalQuestions: 3,
    isCompleted: false,
    createdAt: "2024-01-25",
    questions: [
      {
        questionId: "4-1",
        question: "Node.js의 이벤트 루프에 대한 설명으로 올바른 것은?",
        options: ["단일 스레드", "논블로킹 I/O", "비동기 처리", "모든 것"],
        correctAnswer: 3,
        explanation: "Node.js는 단일 스레드 기반의 논블로킹 I/O와 비동기 처리를 특징으로 합니다.",
      },
      {
        questionId: "4-2",
        question: "Express.js에서 미들웨어의 역할은?",
        options: ["요청 처리", "응답 수정", "에러 처리", "모든 것"],
        correctAnswer: 3,
        explanation: "Express 미들웨어는 요청-응답 사이클에서 다양한 처리를 담당합니다.",
      },
      {
        questionId: "4-3",
        question: "npm과 yarn의 차이점이 아닌 것은?",
        options: ["설치 속도", "보안", "패키지 관리", "JavaScript 문법"],
        correctAnswer: 3,
        explanation: "npm과 yarn은 패키지 매니저로, JavaScript 문법과는 관련이 없습니다.",
      },
    ],
  },
]

export const quizService = {
  getAllQuizzes: async (): Promise<QuizType[]> => {
    // 실제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 800))
    return [...mockQuizzes]
  },

  getQuizById: async (quizId: string): Promise<QuizType | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockQuizzes.find((quiz) => quiz.quizId === quizId) || null
  },

  submitQuiz: async (submission: QuizSubmissionType): Promise<{ score: number; totalQuestions: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const quiz = mockQuizzes.find((q) => q.quizId === submission.quizId)
    if (!quiz) throw new Error("Quiz not found")

    let correctAnswers = 0
    submission.answers.forEach((answer) => {
      const question = quiz.questions.find((q) => q.questionId === answer.questionId)
      if (question && question.correctAnswer === answer.answer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / quiz.questions.length) * 100)

    // Mock: 퀴즈 완료 상태 업데이트
    const quizIndex = mockQuizzes.findIndex((q) => q.quizId === submission.quizId)
    if (quizIndex !== -1) {
      mockQuizzes[quizIndex].isCompleted = true
      mockQuizzes[quizIndex].score = score
    }

    return { score, totalQuestions: quiz.questions.length }
  },
}