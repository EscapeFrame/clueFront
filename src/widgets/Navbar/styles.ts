import styled from '@emotion/styled';
import {fonts} from '@/shared/styles/font.styles';
import { black, white, gray } from '@/shared/styles/theme.styles';

export const NavbarWrapper = styled.div`
  width: 100%;
  background-color: ${white};
  outline: 0.06em solid ${gray[200]};
  padding: 0.63em 0;
  box-sizing: border-box;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  margin: 0 150px;
  padding: 0;
`;

export const Brand = styled.a`
  ${fonts.P4}
  text-decoration: none;
  color: ${black};
`;

export const LogoImg = styled.img`
  height: 25px;
`;

export const NavbarNav = styled.nav`
  display: flex;
  position: absolute;
  right: 150px;
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
  color: ${black};
  ${fonts.P2}
  &:hover {
    text-decoration: underline;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${fonts.P2}
  color: black;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${white};
  border: 1px solid ${gray[250]};
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  min-width: 12.5rem;
  padding: 0.625rem 0;
  display: flex;
  flex-direction: column;
  z-index: 999;
`;

export const DropdownItem = styled.a`
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: ${black};
  ${fonts.P1}

  &:hover {
    background-color: ${gray[100]};
  }
`;

// Dropdown 내용
export const ProfileInfoBox = styled.div`
  padding: 12px;
  border-bottom: 1px solid ${gray[100]};
  text-align: center;
  background-color: ${gray[150]};
`;

export const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 8px;
`;

export const ProfileName = styled.div`
  font-weight: 600;
`;

export const ProfileStudentNumber = styled.div`
    ${fonts.P1}
    color: ${gray[300]};
`;