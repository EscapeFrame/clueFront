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
`;

export const LogoBox = styled.div`
  justify-content: center;
  margin:auto;
  display: flex;
  text-align: center;
`

export const LoginScript = styled.div `
  text-align: center;
  margin-top : 20px;
  margin-bottom : 60px;
  ${fonts.P3}
`

export const AgreementScript = styled.div `
  text-align: center;
  margin-top : 10px;
  ${fonts.P2}
  color: ${theme.colors.gray[600]}
`

