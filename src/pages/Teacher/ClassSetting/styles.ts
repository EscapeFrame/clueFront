import { theme } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 2rem 10rem;
`;

export const ErrorMessage  = styled.input`
  color: ${theme.colors.red};
`;

export const Icon  = styled.div`
  size: 24px;
  cursor: pointer;
  margin-bottom: 1rem; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;