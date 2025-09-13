import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  min-width: 600px;
  padding: 2rem 8rem;
  background: ${theme.colors.blue[100]};
  width: 100%;

  @media (max-width: 1200px) {
    padding: 2rem 4rem;
  }
  
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

  @media (max-width: 768px) {
    ${fonts.P4};
  }

  @media (max-width: 480px) {
    ${fonts.P3};
  }
`;

export const Explain = styled.p`
  ${fonts.P2}
  color: ${theme.colors.gray[500]};
  padding: 0;
  margin: 0;

  @media (max-width: 480px) {
    ${fonts.P1};
  }
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
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

export const Half = styled.div`
  flex: 1;
  min-width: 0; // flex item 줄바꿈 방지

  @media (max-width: 768px) {
    width: 100%;
  }
`;