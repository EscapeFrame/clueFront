import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const Image = styled.img`
  max-width: 300px;
  width: 100%;
  margin-bottom: 1.5rem;

  @media (max-width: 1200px) {
    max-width: 250px;
  }

  @media (max-width: 768px) {
    max-width: 180px;
    margin-bottom: 1rem;
  }
`;

export const Message = styled.p`
  ${fonts.P5}
  margin-bottom: 1rem;
  color: ${theme.colors.black};

  @media (max-width: 1200px) {
    ${fonts.P4}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
    margin-bottom: 0.8rem;
  }
`;

export const GoToMain = styled.div`
  ${fonts.P3}
  color: ${theme.colors.black};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 1200px) {
    ${fonts.P4}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
  }
`;