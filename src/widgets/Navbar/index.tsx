/** @jsxImportSource @emotion/react */
import * as s from './styles';
import Dropdown from '@/widgets/UserMenu/index';

interface NavbarProps {
  studentNumber: number;
  name: string;
  myImage: string;
  role: string | null;
}

export default function Navbar({ role, studentNumber, name, myImage }: NavbarProps) {
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
          <Dropdown role={role} studentNumber={studentNumber} name={name} myImage={myImage} />
        </s.NavbarNav>
      </s.Container>
    </s.NavbarWrapper>
  );
}