/** @jsxImportSource @emotion/react */
import * as s from './styles';
import Dropdown from '@/widgets/UserMenu/index';
import clueLogo from '../../../public/clueLogo.png';
import { useLocation, useNavigate } from 'react-router-dom';


interface NavbarProps {
  userId: number;
  username: string;
  role: string | null;
  classCode?: number |string;
}

export default function Navbar({ classCode, username, role }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const Main = () => {
    navigate("/");
  }

  const LinkSave = () => {
    navigate("/linksave");
  }

  const isLinkSavePage = location.pathname.startsWith('/linksave');

  const message = () => {
    alert("아직 개발되지 않은 기능입니다.")
  }

  return (
    <s.NavbarWrapper>
      <s.Container>
        <s.Brand>
          <s.LogoImg onClick={Main} src={clueLogo} alt="로고" />
          <s.BrandText onClick={isLinkSavePage ? Main : LinkSave}>{isLinkSavePage ? 'LinkSave' : 'CLUE'}</s.BrandText>
        </s.Brand>
        <s.NavbarNav>
          <s.NavLinks>
            <li><s.NavItem href="/class">내 학습실</s.NavItem></li>
            <li><s.NavItem onClick={() => {message()}} href="#action1">수강신청</s.NavItem></li>
            <li><s.NavItem href="https://bssm.notion.site/Paletto-264f4899fc868056870de0c479446aca" target="_blank" rel="noopener noreferrer">서비스 소개</s.NavItem></li>
          </s.NavLinks>
          <s.UserMenuWrapper>

            <Dropdown role={role} studentNumber={classCode} name={username} />
          </s.UserMenuWrapper>
        </s.NavbarNav>
      </s.Container>
    </s.NavbarWrapper>
  );
}