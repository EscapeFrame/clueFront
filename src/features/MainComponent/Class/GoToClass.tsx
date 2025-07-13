import { useState } from 'react';
import { Subtopic } from './subtopic/Subtopic';
import { Posts } from './Theme';
import { Card } from './card/Card';
import { TopContainer, Container, CardContainer, FlexColumn, FlexBetween } from './GoToClass.styles';

export default function GoToClass() {
    const [isActive, setIsActive] = useState<number>(0);
    return (
        <TopContainer>
            <Container>
                <h1>학습실 바로가기</h1>
                <FlexBetween>
                    <p>간편하게 수업에 함께 참여해 보세요!</p>
                    <p>더보기 &gt;</p>
                </FlexBetween>
                <FlexColumn>
                    <div>
                        <Subtopic
                            title="인문과목"
                            isActive={isActive === 0}
                            onClick={() => setIsActive(0)}
                        />
                        <Subtopic
                            title="전공과목"
                            isActive={isActive === 1}
                            onClick={() => setIsActive(1)}
                        />
                        <Subtopic
                            title="방과후"
                            isActive={isActive === 2}
                            onClick={() => setIsActive(2)}
                        />
                    </div>
                    <CardContainer>
                        {Posts.map((post, index) => (
                            <Card
                                key={index}
                                tittle={post.tittle}
                                subject={post.subject}
                                classRoom={post.classRoom}
                                people={post.people}
                            />
                        ))}
                    </CardContainer>
                </FlexColumn>

            </Container>
        </TopContainer>
    );
}
