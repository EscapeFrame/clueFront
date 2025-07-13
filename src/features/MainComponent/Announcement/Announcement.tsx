import React from 'react';
import { TopContainer, Container, Card, Title, Row } from './Announcement.styles';
// import Inventory from './Inventory.tsx';

export default function Announcement() {
  return (
    <TopContainer>
      <Container>
        <h1>공지안내</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>학교의 소식을 빠르게 알아보세요!</p>
          <p>더보기 &gt;</p>
        </div>
        <Row>
          <Card>
            <Title>서비스공지</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>임시 코드</p>
              <p>날짜</p>
            </div>
          </Card>
          <Card>
            <Title>학교공지</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>임시 코드</p>
              <p>날짜</p>
            </div>
          </Card>
          <Card>
            <Title>일정안내</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>임시 코드</p>
              <p>날짜</p>
            </div>
          </Card>
        </Row>
      </Container>
    </TopContainer>
  );
}
