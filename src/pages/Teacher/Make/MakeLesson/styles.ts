/** @jsxImportSource @emotion/react */
import { fonts } from "@/shared/theme/font.styles";
import { theme } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 2rem 20rem;
  display: flex;
  flex-direction: column;
`;


export const Title = styled.div`
  ${fonts.P5}
  font-weight: 600;
  text-align: center;
  margin: 0;
  padding: 0;
`;

export const desc = styled.div`
  ${fonts.P2}
  text-align: center;
  color: ${theme.colors.gray[500]};
  margin-bottom: 1rem;
  padding: 0;
`;


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;