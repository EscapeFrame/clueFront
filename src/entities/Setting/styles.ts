import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
`;

export const MenuButton = styled.button<{ active?: boolean }>`
  width: 100%;
  background: transparent;
  border: none;
  text-align: center;
  ${fonts.P3}
  padding: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? colors.primary : "none")};
  color: ${({ active }) => (active ? colors.white : colors.gray[4])};
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }
`;
export const Sidebar = styled.nav<{ isOpen?: boolean }>`
  width: 220px;
  position: fixed;
  left: 8rem;
  top: 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 40px 20px;
  box-sizing: border-box;
  z-index: 1000;
  transition: left 0.3s;

  @media (max-width: 1200px) {
    left: ${({ isOpen }) => (isOpen ? "0" : "-260px")};
  }

  @media (max-width: 768px) {
    left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    padding: 20px;
  }
`;

export const Content = styled.div<{ sidebarOpen?: boolean }>`
  flex: 1;
  margin-left: 220px;
  overflow-y: auto;
  padding: 40px;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  gap: 30px;
  transition: margin-left 0.3s;

  @media (max-width: 1200px) {
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? "220px" : "0")};
    padding: 20px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.gray[3]};
    border-radius: 4px;
  }
`;

export const SidebarToggle = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1100;
  background: ${colors.primary};
  border: none;
  color: ${colors.white};
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;

  @media (max-width: 1200px) {
    display: block;
  }
`;
