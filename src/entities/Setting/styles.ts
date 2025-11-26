import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
// fonts 모듈은 현재 사용하지 않음

export const Container = styled.div`
  display: flex;
  height: calc(100% - 80px);
  padding: 2rem 6rem; /* 다른 페이지와 유사한 좌우 여백 */
  background: ${colors.gray[1]};
  box-sizing: border-box;
`;



export const Content = styled.div<{ sidebarOpen?: boolean }>`
  flex: 1;
  margin-left: 0;
  overflow-y: auto;
  height: 100%;
  padding: 20px 0 40px 0;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  gap: 30px;
  transition: margin-left 0.3s;

  @media (max-width: 1200px) {
    padding: 16px 0;
  }

  @media (max-width: 768px) {
    padding: 12px 0;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.gray[3]};
    border-radius: 4px;
  }
`;

/* Sidebar, MenuButton, SidebarToggle 제거: 설정 페이지는 사이드바 없이 콘텐츠로만 구성됩니다. */