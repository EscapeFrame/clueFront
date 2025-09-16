import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  justify-content: center;
  position: relative;
  margin-top: 10%;

  img {
    width: 20%;
    height: 20%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 1200px) {
    img {
      width: 20%;
      height: 20%;
    }
  }

  @media (max-width: 768px) {
    img {
      width: 40%;
      height: 40%;
    }
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

  @media (max-width: 480px) {
    ${fonts.P1}
    margin-bottom: 30px;
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

  @media (max-width: 480px) {
    ${fonts.P1}
  }
`;