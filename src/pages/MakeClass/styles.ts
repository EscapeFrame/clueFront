import { blue, white } from '@/shared/styles/theme.styles';
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 40px 300px;
  background-color: ${white};
  height: 100%;

`;

export const PostButton = styled.div`
  width: 100%;
  background: ${blue[500]};
  color: ${white};
  padding: 10px 0;
  border-radius: 8px;
  text-align: center;
`;
