import { IoIosArrowBack } from "react-icons/io";
import * as s from "./styles";

type Props = {
    current: number;    // 현재 문제 번호
    total: number;      // 전체 문제 수
    timeLeft?: number;   // 남은 시간 (초)
    totalTime?: number;  // 문제당 총 시간
    onQuit: () => void;
};

export default function QuizHeader({ current, total, timeLeft = 0, totalTime, onQuit }: Props) {
    const progress = totalTime ? Math.max((timeLeft / totalTime) * 100, 0) : 0;

    return (
        <s.Container>
            <s.Section>
                <s.QuitButton onClick={onQuit}>
                    <IoIosArrowBack />&nbsp;퀴즈 나가기
                </s.QuitButton>
                <s.QuestionCount>문제&nbsp; {`${current} / ${total}`}</s.QuestionCount>
            </s.Section>

            {totalTime && (
                <>
                    <s.TimeBarContainer>
                        <s.TimeBar progress={progress} />
                    </s.TimeBarContainer>

                    <s.TimeWrapper>
                        <s.TimeText timeLeft={timeLeft}>{timeLeft}</s.TimeText>
                    </s.TimeWrapper>
                </>
            )}
        </s.Container>
    );
}
