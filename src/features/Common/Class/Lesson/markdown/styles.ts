import styled from "@emotion/styled";
import { colors } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";

export const PageWrapper = styled.div`
  display: flex;
  height: calc(100vh - var(--app-top-offset, 0px));
  background-color: ${colors.white};
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  background-color: ${colors.white};
`;

export const ViewerContainer = styled.div`
  background: ${colors.white};
  width: 100%;
  border-radius: 12px;
  padding: 40px 60px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
`;

export const ViewerHeader = styled.div`
  margin-bottom: 48px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: ${colors.black};
    margin: 0;
    border-bottom: 2px solid ${colors.gray[3]};
    padding-bottom: 12px;
  }
`;

export const ViewerWrapper = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  line-height: 1.8;
  color: ${colors.black};

  h1,
  h2,
  h3 {
    margin-top: 32px;
    font-weight: 700;
    color: #111;
  }

  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
    color: #222;
  }
  h3 {
    font-size: 18px;
    color: #333;
  }

  p {
    margin-bottom: 18px;
  }

  ul {
    margin-left: 24px;
    margin-bottom: 16px;
  }

  li {
    margin-bottom: 8px;
  }

  code {
    background-color: #f2f3f5;
    padding: 2px 6px;
    border-radius: 4px;
  }

  pre {
    background-color: #f8f9fa;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
  }

  blockquote {
    border-left: 4px solid ${colors.gray[3]};
    margin: 16px 0;
    padding-left: 12px;
    color: #555;
  }
`;

export const Sidebar = styled.div`
  width: 16rem;
  background-color: #fafbfc;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const TopTabs = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid ${colors.gray[4]};
`;

export const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 8px;
  border: none;
  // background-color: ${({ active }) => (active ? colors.gray[4] : 'transparent')};
  border-radius: 6px;
  // cursor: pointer;
  transition: background-color 0.2s;
  color: #333;

  svg {
    font-size: 20px;
  }

  // &:hover {
  //   background-color: ${({ active }) => (active ? colors.blue.light2 : colors.gray[2])};
  // }

  span {
    font-size: 11px;
    font-weight: ${({ active }) => (active ? 600 : 400)};
    white-space: nowrap;
  }
`;

export const NavigationSection = styled.div`
  padding: 16px;
  flex: 1;
`;

export const SidebarTitle = styled.div`
  ${fonts.P4}
  color: #333;
  margin-bottom: 20px;
`;

export const DirectoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 15px;
  padding: 10px 0;
  cursor: pointer;
  color: #222;

  &:hover {
    color: ${colors.blue.dep1};
  }
`;

export const ArrowIcon = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});

  svg {
    font-size: 16px;
    color: #666;
  }
`;

export const DocumentList = styled.div`
  padding-left: 0;
  margin-top: 4px;
`;

export const DocumentItem = styled.div<{ active: boolean }>`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? colors.blue.light2 : 'transparent')};
  color: ${({ active }) => (active ? '#111' : '#333')};
  margin-bottom: 2px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? colors.blue.light2 : colors.gray[2])};
    color: ${({ active }) => (active ? '#111' : colors.blue.dep2)};
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  right: 30px;
  bottom: 30px;
  background: ${colors.blue.dep2};
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 999px;
  box-shadow: 0 6px 18px rgba(59,130,246,0.24);
  cursor: pointer;
  font-weight: 700;
  z-index: 1200;
  transition: transform 0.12s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;
 