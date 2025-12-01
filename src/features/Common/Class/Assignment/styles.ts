import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

interface StatusProps {
  $isSubmitted: boolean;
}

export const Container = styled.div`
  padding: 2rem 14rem;
  min-height: 100vh;
  @media (max-width: 1200px) {
    padding: 2rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
