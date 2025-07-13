import { TopContainer, Container, Content, ItemList, Item } from './Footer.styles';

export default function TeamFooter() {
  return (
    <TopContainer>
      <Container>
        <Content>
          <img
            src="/TeamLogo.png"
            alt="샘플"
            width={245}
            height={45}
          />
          <ItemList>
            <Content>
              <Item>김민재</Item>
              <p>보안</p>
            </Content>
            <Content>
              <Item>김한결</Item>
              <p>백엔드</p>
            </Content>
            <Content>
              <Item>공덕현</Item>
              <p>프론트엔드</p>
            </Content>
            <Content>
              <Item>안재민</Item>
              <p>앱</p>
            </Content>
            <Content>
              <Item>노유현</Item>
              <p>디자인</p>
            </Content>
          </ItemList>
        </Content>
      </Container>
    </TopContainer>
  );
}
