import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

interface StyledButtonProps {
  width: string;
  variant: 0 | 1;
}

export const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ width }) => width};
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  ${fonts.P2}
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  background-color: ${({ variant, theme }) =>
    variant === 0 ? theme.colors.blue[500] : theme.colors.white};
  
  border: ${({ variant, theme }) =>
    variant === 1 ? `1px solid ${theme.colors.blue[500]}` : 'none'};

  color: ${({ theme }) => theme.colors.black};

  &:hover {
    background-color: ${theme.colors.blue[600]};
    color: ${theme.colors.white};
  }
`;