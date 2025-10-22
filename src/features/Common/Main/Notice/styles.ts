import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const TopContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 2rem;
  box-sizing: border-box;
  background: white;
  border-radius: 24px;
`;

export const Container = styled.div`
  width: 100%;
  background: ${theme.colors.white};
  margin: 0;
  box-sizing: border-box;
`;

export const Title = styled.div`
  ${fonts.P5}
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P4};
  }
`;

export const Explain = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

export const Row = styled.div`
  gap: 32px;
  width: 100%;
  margin-top: 12px;
`;
