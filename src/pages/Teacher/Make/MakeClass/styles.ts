import { theme } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 40px 300px;
  background-color: ${theme.colors.white};
  height: 100%;

  @media (max-width: 1200px) {
    padding: 40px 200px;
  }

  @media (max-width: 768px) {
    padding: 40px 100px;
  }
`;

export const PostButton = styled.div`
  width: 100%;
  background: ${theme.colors.blue[500]};
  color: ${theme.colors.white};
  padding: 10px 0;
  border-radius: 8px;
  text-align: center;
`;

export const ErrorMessage  = styled.input`
  color: ${theme.colors.red};
`;