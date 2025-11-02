import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const PageWrapper = styled.div`
  display: flex;
  height: calc(100vh - var(--app-top-offset, 0px));
  background-color: #fff;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  background-color: #fff;
`;

export const ViewerContainer = styled.div`
  background: white;
  width: 100%;
  border-radius: 12px;
  padding: 40px 60px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
`;

export const ViewerHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #222;
    margin: 0;
    border-bottom: 2px solid ${theme.colors.gray[300]};
    padding-bottom: 12px;
  }
`;

export const ViewerWrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.8;
  color: #2c2c2c;

  h1, h2, h3 {
    margin-top: 32px;
    font-weight: 700;
    color: #111;
  }

  h1 { font-size: 24px; }
  h2 { font-size: 20px; color: #222; }
  h3 { font-size: 18px; color: #333; }

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
    border-left: 4px solid ${theme.colors.gray[300]};
    margin: 16px 0;
    padding-left: 12px;
    color: #555;
  }
`;

export const Sidebar = styled.div`
  width: 280px;
  background-color: #fafbfc;
  border-right: 1px solid ${theme.colors.gray[300]};
  padding: 24px;
  height: 100%;
  overflow-y: auto;
`;

export const SidebarTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
`;

export const DirectoryItem = styled.div`
  font-weight: 600;
  font-size: 15px;
  padding: 10px 0;
  cursor: pointer;
  color: #222;

  &:hover {
    color: ${theme.colors.blue[600]};
  }
`;

export const DocumentItem = styled.div<{ active: boolean }>`
  padding: 6px 0 6px 18px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ active, theme }) => (active ? theme.colors.blue[600] : '#555')};
  font-weight: ${({ active }) => (active ? '600' : '400')};

  &:hover {
    color: ${theme.colors.blue[700]};
  }
`;