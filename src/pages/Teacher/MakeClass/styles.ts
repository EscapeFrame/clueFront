import { theme } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 40px 300px;
  background-color: ${theme.colors.white};
  height: 100%;

`;

export const PostButton = styled.div`
  width: 100%;
  background: ${theme.colors.blue[500]};
  color: ${theme.colors.white};
  padding: 10px 0;
  border-radius: 8px;
  text-align: center;
`;