import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  padding: 2rem 8rem;
  background: ${theme.colors.blue[100]};
  width: 100%;

  @media (max-width: 1200px) {
    padding: 2rem 4rem;
  }

  min-width: 600px;

  @media (max-width: 768px) {
    align-items: center;
    padding: 1rem 2rem;
  }
`;

export const Title = styled.h1`
  ${fonts.P5}
  font-weight: 600;
  padding: 0;
  margin: 0;
`;

export const Explain = styled.p`
  ${fonts.P2}
  color: ${theme.colors.gray[500]};
  padding: 0;
  margin: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-top: 1rem;
  padding: 2rem;
  background: ${theme.colors.white};
  border-radius: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const Half = styled.div`
  flex: 1;
`;