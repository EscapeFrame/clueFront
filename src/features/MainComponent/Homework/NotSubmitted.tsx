import { TopContainer, Container, CardContainer } from './NotSubmitted.styles';
import { Posts } from './Theme';
import { Card } from './Card/HomeworkCard';

export default function NotSubmitted(): React.ReactNode {
    return (
        <TopContainer>
            <Container>
                <h1>미제출 과제</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>기간안에 과제를 제출하세요!</p>
                </div>
                <CardContainer>
                    {Posts.map((post, index) => (
                        <Card
                            key={index}
                            date={post.date}
                            body={post.body}
                            link={post.link}
                        />
                    ))}
                </CardContainer>
            </Container>
        </TopContainer>
    );
}
