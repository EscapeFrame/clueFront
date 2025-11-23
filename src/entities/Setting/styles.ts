import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  height: calc(100% - 80px);
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
  background-color: ${({ active }) => (active ? colors.primary : "transparent")};
  color: ${({ active }) => (active ? colors.white : colors.gray[4])};
  transition: all 0.2s;

  &:hover {
    color: ${({ active }) => (active ? colors.white : colors.primary)};
    background-color: ${({ active }) => (active ? colors.blue.dep2 : "rgba(0, 0, 0, 0.05)")};

  }
`;

export const Sidebar = styled.nav<{ isOpen?: boolean }>`
  width: 220px;
  position: fixed;
  left: 8rem;
  top: 2rem;
  height: calc(100% - 80px); /* 네브바 높이 제외 */
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
  height: 100%;
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
  top: 0;
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