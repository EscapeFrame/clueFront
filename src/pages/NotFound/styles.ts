import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 1rem;
  gap: 10rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

`;

export const Bar = styled.hr`
  width: 50%;
  border: none;
  border-top: 2px solid  #FFD93F;
  margin: 1rem 0;
`;

export const ErrorCode = styled.div`
  font-weight: 100;
  font-size: 5rem;
  margin: 0;
  margin-bottom: 1rem;
  line-height: 1;

  @media (max-width: 1200px) {
    font-size: 6rem;
  }

  @media (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 0.8rem;
  }
`;

export const Image = styled.img`
  max-width: 300px;
  width: 100%;
  margin-bottom: 1.5rem;
  animation: swing 3s ease-in-out infinite;

  @keyframes swing {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

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

export const Sorry = styled.p`
  ${fonts.P4}
  color: ${theme.colors.black};
  `;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  `;

export const GoToMain = styled.div`
  ${fonts.P3}
  color: ${theme.colors.black};
  width: 150px;
  padding: 0.5rem 2rem;
  cursor: pointer;
  background-color: #FFD93F;
  border-radius: 12px;
  text-align: center;

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

export const Button = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const Retry = styled.div`
  ${fonts.P3}
  width: 150px;
  padding: 0.5rem 2rem;
  cursor: pointer;
  border: 1px solid #FFD93F;
  border-radius: 12px;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 1200px) {
    ${fonts.P4}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
    margin-left: 0.5rem;
  }
`;