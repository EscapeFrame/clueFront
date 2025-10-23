import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  margin-top: 10rem;

  @media (max-width: 856px) {
    flex-direction: column;
  }
`;

export const LogoBox = styled.div`
  justify-content: center;
  margin: auto;
  display: flex;
  text-align: center;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const LoginScript = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 60px;
  ${fonts.P3}

  @media (max-width: 1200px) {
    ${fonts.P2}
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    ${fonts.P2}
    margin-bottom: 40px;
  }
`;

export const AgreementScript = styled.div`
  text-align: center;
  margin-top: 10px;
  ${fonts.P2}
  color: ${theme.colors.gray[600]};

  @media (max-width: 1200px) {
    ${fonts.P3}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
  }
`;

export const Left = styled.div`
  width: 50%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Right = styled.div`
  width: 50%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Eclpise = styled.div`
  width: 40%;
  height: 50%;
  border-radius: 518px;
  background: rgba(134, 193, 255, 0.6);
  filter: blur(50px);
  position: absolute;
  z-index: -100;
`;

export const Image = styled.img`
  width: 80%;
  height: auto;
  z-index: 1;
`;

export const Tittle = styled.div`
  ${fonts.P5}
  margin-top: 2rem;
  color: ${theme.colors.black};

  @media (max-width: 856px) {
    ${fonts.P4}
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
`;