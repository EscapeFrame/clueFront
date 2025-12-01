import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import * as s from "./styles";
import { colors } from "@/shared/theme/theme.styles";

interface Student {
    id: string;
    name: string;
    profileImage?: string;
    score: number;
    correct: number;
}

interface WaitingRoomProps {
    roomCode: string;
    initialMembers?: number;
    initialQuestions?: number;
    initialTime?: number;
    students?: Student[];
    onStart?: () => void;
}

export default function WaitingRoom({
    roomCode,
    students = [],
    onStart,
    initialMembers = 0,
    initialQuestions = 3,
    initialTime = 30,
}: WaitingRoomProps) {
    const [memberCount, setMemberCount] = useState(initialMembers);
    const [questionsCount] = useState(initialQuestions);
    const [timeCount, setTimeCount] = useState(initialTime);

    // 실시간 참가자 수 업데이트
    useEffect(() => {
        setMemberCount(students.length);
    }, [students]);

    return (
        <s.Container>
            <s.Header>
                <s.Title>퀴즈 생성하기</s.Title>
                <s.Explanation>학생들이 참여할 퀴즈를 만들어보세요</s.Explanation>
            </s.Header>

            <s.Body>
                <s.Left>
                    <s.SubTitle>참가자 목록</s.SubTitle>
                    <s.MemberList>
                        {students.map((student) => (
                            <s.Member
                                key={student.id}
                                bgColor={colors.gray[1]}
                                borderColor={colors.gray[2]}
                            >
                                <s.MemberImageBox>
                                    <img
                                        src={student.profileImage || '/Paletto/panda.png'}
                                        alt={student.name}
                                    />
                                </s.MemberImageBox>
                                <span>{student.name}</span>
                            </s.Member>
                        ))}
                    </s.MemberList>
                </s.Left>

                <s.Right>
                    <s.CodeBox>
                        <s.SubTitle2>방 코드</s.SubTitle2>
                        <s.Code>{roomCode}</s.Code>
                    </s.CodeBox>

                    <s.Card>
                        <s.Section>
                            <s.SubTitle>현재 참가인원</s.SubTitle>
                            <s.PointText>{memberCount}</s.PointText>
                        </s.Section>
                    </s.Card>

                    <s.Card>
                        <s.Section>
                            <s.SubTitle>문항수</s.SubTitle>
                            <s.PointText>{questionsCount}</s.PointText>
                        </s.Section>
                        <s.Section>
                            <s.SubTitle>문제당 제공시간</s.SubTitle>
                            <s.TimeControl>
                                <s.Button onClick={() => setTimeCount((prev) => Math.max(prev - 5, 5))}>
                                    <IoIosArrowDown />
                                </s.Button>
                                <s.PointText>{timeCount}초</s.PointText>
                                <s.Button onClick={() => setTimeCount((prev) => prev + 5)}>
                                    <IoIosArrowUp />
                                </s.Button>
                            </s.TimeControl>
                        </s.Section>
                    </s.Card>

                    <s.SubmitButton onClick={() => onStart?.()}>
                        퀴즈 시작
                    </s.SubmitButton>
                </s.Right>
            </s.Body>
        </s.Container>
    );
}