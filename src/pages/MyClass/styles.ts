import { fonts } from '@/shared/styles/font.styles';
import { white } from '@/shared/styles/theme.styles';
import styled from '@emotion/styled';

export const Body = styled.div`
  padding: 40px 150px;
  background-color: ${white};
`;

export const TitleFont = styled.h1`
  ${fonts.P3}
  margin-bottom: 24px;
`;