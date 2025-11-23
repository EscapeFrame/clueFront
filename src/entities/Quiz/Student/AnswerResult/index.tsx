import { HiMiniXMark } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import * as s from "./styles";
import { Question } from "@/pages/Student/Quiz/dummy";

type AnswerResultProps = {
    question: Question;
    selectedAnswer: number | null;
    onNext: () => void;
    current: number; // 현재 문제 번호
    total: number;   // 총 문제 수
};

export default function AnswerResult({
    question,
    selectedAnswer,
    current,
    total,
    onNext,
}: AnswerResultProps) {

    const isWrong = selectedAnswer !== question.correctIndex;

    return (
        <s.Container>
            <s.Section>
                <s.QuitButton>
                    <IoIosArrowBack /> 퀴즈 나가기
                </s.QuitButton>

                <s.QuestionCount>
                    문제 {current} / {total}
                </s.QuestionCount>
            </s.Section>

            <s.Card $isWrong={isWrong}>
                {isWrong ? (
                    <>
                        <HiMiniXMark />
                        <s.CardTitle $isWrong={isWrong}>오답입니다</s.CardTitle>
                        <s.Explanation>괜찮아요! 다음 문제도 힘내봐요.</s.Explanation>
                    </>
                ) : (
                    <>
                        <FaCheck />
                        <s.CardTitle $isWrong={isWrong}>정답입니다!</s.CardTitle>
                        <s.Explanation>좋아요! 계속 도전해요!</s.Explanation>
                    </>
                )}
            </s.Card>

            <s.NextButton onClick={onNext}>다음</s.NextButton>
        </s.Container>
    );
}