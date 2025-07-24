import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 40px;
  background-color: ${theme.colors.white};
`;
export const Text = styled.p`
  ${fonts.P2}
  color: ${theme.colors.gray[500]};
`;