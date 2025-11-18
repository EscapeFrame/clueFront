import CreateQuiz from "@/entities/Quiz/Teacher/CreateQuiz";
import QuizPlaying from "@/entities/Quiz/Teacher/QuizPlaying";
import QuizResult from "@/entities/Quiz/Teacher/QuizResult";
import WaitingRoom from "@/entities/Quiz/Teacher/WaitingRoom";
import { useState } from "react";

type TeacherStep =
  | "create"       // 퀴즈 생성
  | "waiting"      // 대기실
  | "question"     // 문제 출제
  | "ranking"      // 정답공개 + 랭킹
  | "finish";      // 종료

export default function TCHQuiz() {
    return (
        <>
        </>
    );
}