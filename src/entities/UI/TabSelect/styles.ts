import styled from "@emotion/styled";
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

interface TabButtonProps {
  active?: boolean;
}

export const TabSelector = styled.div`
  padding: 0 8rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    gap: 1rem;
  }
`;

export const TabButton = styled.button<TabButtonProps>`
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${fonts.P2};
  border-bottom: ${({ active }) => (active ? `2px solid ${theme.colors.blue[500]}` : "none")};
  font-weight: ${({ active }) => (active ? 600 : "normal")};
  color: ${({ active }) => (active ? theme.colors.black : theme.colors.gray[600])};

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    ${fonts.P2};
  }
`;