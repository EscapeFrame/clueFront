import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 2rem 30rem;
  @media (max-width: 1024px) {
    padding: 2rem 5rem;
  }
`;

export const ErrorMessage = styled.div`
  color: ${colors.red[3]};
`;

export const Icon = styled.div`
  ${fonts.P4};
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
