import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { colors } from '@/shared/theme/theme.styles';

export const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 50px;
  padding: 0.5rem 8rem;
  background-color: rgba(255, 255, 255, 0.8);
  outline: 0.5px solid ${colors.gray[3]};
  z-index: 1000;

  min-width: 690px;

  display: flex;
  align-items: center;

  /* 반응형 패딩 */
  @media (max-width: 868px) {
    padding: 0.5rem 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
`;

export const Brand = styled.div`
  ${fonts.P4}
  text-decoration: none;
  color: ${colors.black};
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  margin-left: auto;
  cursor: pointer;

  height: 40px;
  margin-right: 0.5rem; /* 텍스트랑 간격 */
`;

export const BrandText = styled.span`
  font-family: 'Alexandria', sans-serif;
  ${fonts.P4}
  cursor: pointer
`;

export const NavbarNav = styled.nav`
  margin-left: 20px;
  display: flex;
  align-items: center; /* 세로 중앙정렬 */
  flex-grow: 1;
  justify-content: space-between;
`;

export const NavLinks = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NavItem = styled.a`
  margin-right: 1.25rem;
  text-decoration: none;
  color: ${colors.black};
  ${fonts.P2}
  display: flex;
  align-items: center; /* 텍스트 세로 중앙정렬 */
  height: 100%; /* 높이 꽉 채워서 정렬 안정화 */
  cursor: pointer;

  &:hover {
    color: ${colors.blue.dep1};
  }

  @media (max-width: 480px) {
    margin-right: 0.75rem;
    ${fonts.P3}
  }
`;

export const UserMenuWrapper = styled.div`
  display: flex;
`;