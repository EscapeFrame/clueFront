/** @jsxImportSource @emotion/react */
import * as s from './styles';
import Dropdown from '@/widgets/UserMenu/index';

interface NavbarProps {
  userId: number;
  username: string;
  role: string | null;
}

export default function Navbar({ userId, username, role }: NavbarProps) {
  return (
    <s.NavbarWrapper>
      <s.Container>
        <s.Brand href="/">
          <s.LogoImg src="/clue.svg" alt="로고" />
        </s.Brand>
        <s.NavbarNav>
          <s.NavLinks>
            <li><s.NavItem href="/class">학습실로 가기</s.NavItem></li>
            <li><s.NavItem href="#action1">수강신청</s.NavItem></li>
            <li><s.NavItem href="#action2">서비스 소개</s.NavItem></li>
          </s.NavLinks>
          <Dropdown role={role} studentNumber={userId} name={username} myImage={"sample.jpg"} />
        </s.NavbarNav>
      </s.Container>
    </s.NavbarWrapper>
  );
}