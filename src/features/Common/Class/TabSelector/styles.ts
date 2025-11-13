import styled from "@emotion/styled";
import { colors } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";
import { theme } from '@/shared/theme/theme.styles';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const TabList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  ${fonts.P2};
  color: ${({ isActive }) => (isActive ? colors.white : colors.gray[3])};
  background-color: ${({ isActive }) =>
    isActive ? colors.primary : "transparent"};
  border-radius: ${({ isActive }) => (isActive ? "8rem" : "0")};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${theme.colors.blue[500]};
  }
`;
