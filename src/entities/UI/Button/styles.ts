import styled from "@emotion/styled";
import { fonts } from '@/shared/theme/font.styles';
import { colors } from "@/shared/theme/theme.styles";

export const StyledButton = styled.button<{
  width?: string;
  variant?: 0 | 1 | 2 | 3;
}>`
  width: ${({ width }) => width || "100%"};
  height: 44px;
  border-radius: 8px;
  ${fonts.P2}
  cursor: pointer;
  border: none;
  padding: 0.6rem 1.2rem;
  transition: all 0.2s ease-in-out;

  ${({ variant }) => {
    switch (variant) {
      case 0: // Primary
        return `
          background: ${colors.primary};
          color: ${colors.white};
        `;
      case 1: // Light4
        return `
          background: ${colors.blue.light4};
          color: ${colors.black};
        `;
      case 2: // Light4(outlined)
        return `
          background: ${colors.white};
          color: ${colors.black};
          border: 1px solid ${colors.blue.light4};
        `;
      case 3: // Gray3
        return `
          background: ${colors.gray[3]};
          color: ${colors.white};
        `;
      default:
        return `
          background: ${colors.primary};
          color: ${colors.white};
        `;
    }
  }}

  &:hover:not(:disabled) {
    background: ${colors.blue.dep2};
  }

  &:disabled {
    background: ${colors.gray[2]};
    color: ${colors.gray[4]};
    cursor: not-allowed;
  }
`;