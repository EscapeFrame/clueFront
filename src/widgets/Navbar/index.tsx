/** @jsxImportSource @emotion/react */
import * as s from './styles';
import Dropdown from '@/widgets/UserMenu/index';
import clueLogo from '../../../public/clueLogo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/hooks/useAccessToken'; // Import useAuth hook

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // Get user from useAuth hook

  // CLUE 메인 페이지로 이동
  const Main = () => {
    navigate("/"); // CLUE 메인 페이지 경로로 이동
  };

  // LinkSave 메인 페이지로 이동
  const LinkSave = () => {
    navigate("/linksave"); // LinkSave 메인 페이지 경로로 이동
  };

  const isLinkSavePage = location.pathname.startsWith('/linksave');

  const handleLinkSaveClick = () => {
    if (isLinkSavePage) {
      Main(); // 현재 페이지가 /linksave라면 CLUE 메인 페이지로 이동
    } else {
      LinkSave(); // 그렇지 않으면 LinkSave 메인 페이지로 이동
    }
  };

  const formatStudentNumber = (grade?: number, classNo?: number, number?: number): string => {
    if (grade === undefined || classNo === undefined || number === undefined) {
      return '';
    }
    // Ensure classNo is a single digit and number is two digits
    const formattedClassNo = `${classNo}`;
    const formattedNumber = number < 10 ? `0${number}` : `${number}`;
    return `${grade}${formattedClassNo}${formattedNumber}`;
  };

  const studentNumber = formatStudentNumber(user.grade, user.classNo, user.number);

  return (
    <s.NavbarWrapper>
      <s.Container>
        <s.Brand>
          <s.LogoImg onClick={Main} src={clueLogo} alt="로고" />
          <s.BrandText onClick={Main}>{isLinkSavePage ? 'LinkSave' : 'CLUE'}</s.BrandText>
        </s.Brand>
        <s.NavbarNav>
          <s.NavLinks>
              <>
                <li>
                  <s.NavItem href="/class">내 학습실</s.NavItem>
                </li>
                {/* 학생만 LinkSave 메뉴 표시 */}
                {user.role === 'STUDENT' || user.role === 'STU' && (
                  <li>
                    <s.NavItem onClick={handleLinkSaveClick}>
                      {isLinkSavePage ? 'CLUE' : 'LinkSave'}
                    </s.NavItem>
                  </li>
                )}
              </>
            <li>
              <s.NavItem
                href="https://bssm.notion.site/Paletto-264f4899fc868056870de0c479446aca"
                target="_blank"
                rel="noopener noreferrer"
              >
                서비스 소개
              </s.NavItem>
            </li>
          </s.NavLinks>
          <s.UserMenuWrapper>
            <Dropdown role={user.role} studentNumber={studentNumber} name={user.username} myImage={user.myImage ?? undefined} />
          </s.UserMenuWrapper>
        </s.NavbarNav>
      </s.Container>
    </s.NavbarWrapper>
  );
}