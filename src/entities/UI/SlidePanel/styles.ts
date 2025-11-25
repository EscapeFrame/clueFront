import { fonts } from '@/shared/theme/font.styles';
import { colors } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.4);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease;
  z-index: 999;
`;

export const Panel = styled.div<{ isOpen: boolean; width: string }>`
  position: fixed;
  top: 0; right: 0;
  height: 100vh;
  width: ${({ width }) => width};
  max-width: 100%;
  background-color: ${colors.white};
  box-shadow: -4px 0 8px rgba(0,0,0,0.1);
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease, opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  padding: 16px 24px;
  ${fonts.P4};
  font-weight: 600;
  border-bottom: 1px solid ${colors.gray[2]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: ${colors.white};
  z-index: 1;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  ${fonts.P4}
  cursor: pointer;
  line-height: 1;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
`;