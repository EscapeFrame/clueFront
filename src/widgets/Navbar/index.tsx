/** @jsxImportSource @emotion/react */
import * as s from './styles';
import Dropdown from '@/widgets/UserMenu/index';
import clueLogo from '../../../public/clueLogo.png';

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
          <s.LogoImg src={clueLogo} alt="로고" />
          <s.BrandText>CLUE</s.BrandText>
        </s.Brand>
        <s.NavbarNav>
          <s.NavLinks>
            <li><s.NavItem href="/class">내 학습실</s.NavItem></li>
            <li><s.NavItem href="#action1">수강신청</s.NavItem></li>
            <li><s.NavItem href="#action2">서비스 소개</s.NavItem></li>
          </s.NavLinks>
          <s.UserMenuWrapper>
            
            <Dropdown role={role} studentNumber={userId} name={username} myImage={"sample.png"} />
          </s.UserMenuWrapper>
        </s.NavbarNav>
      </s.Container>
    </s.NavbarWrapper>
  );
}