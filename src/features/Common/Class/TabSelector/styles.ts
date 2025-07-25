import styled from '@emotion/styled';
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
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  color: ${({ isActive }) => (isActive ? theme.colors.blue[500] : theme.colors.gray[300])};
  border-bottom: ${({ isActive }) => (isActive ? `2px solid ${theme.colors.blue[500]}` : 'none')};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${theme.colors.blue[500]};
  }
`;