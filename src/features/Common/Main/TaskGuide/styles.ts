import { fonts } from "@/shared/theme/font.styles";
import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme.styles";

export const Container = styled.div`
  background: ${theme.colors.white};
  padding: 30px 8rem;
  max-height: 100%;
  overflow: hidden;
  @media (max-width: 1200px) {
    padding: 30px 4rem;
  }

  @media (max-width: 768px) {
    padding: 20px 2rem;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-top: 12px;

  max-height: 280px;
  overflow-y: auto;
  padding-right: 4px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    max-height: 400px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    max-height: 300px;
  }
`;

export const Title = styled.div`
  ${fonts.P4}

  @media (max-width: 768px) {
    ${fonts.P3}
  }
`;

export const Explain = styled.div`
  display: flex;
  justifycontent: space-between;
  margin: 0;
  padding: 0;
`;
