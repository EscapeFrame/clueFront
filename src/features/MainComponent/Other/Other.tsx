import { TopContainer, Container, Row } from './Other.styles';
import Card from './Card/OtherCard';
import contents from './data';

export default function Other(): React.ReactNode {
    return (
        <TopContainer>
            <Container>
                <h1>학교 서비스로 바로가기</h1>
                <Row>
                    {contents.map((content) => (
                        <Card
                            key={content.href}
                            href={content.href}
                            src={content.src}
                            homepage={content.homepage}
                        />
                    ))}
                </Row>
            </Container>
        </TopContainer>
    );
}
