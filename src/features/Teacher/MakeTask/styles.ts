import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";

export const Container = styled.div`
  background-color: ${theme.colors.white};
  padding: 2rem 16rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.div`
  ${fonts.P5};
  font-weight: 600;
`;