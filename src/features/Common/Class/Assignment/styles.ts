import { fonts } from '@/shared/theme/font.styles';
import { colors } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

interface StatusProps {
  $isSubmitted: boolean;
}

export const Container = styled.div`
  padding: 2rem 14rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;