import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  background-color: ${theme.colors.white};
  margin-bottom: 40px;
`;

export const Title = styled.div`
    ${fonts.P4};
    font-weight:600;
`;

export const SubTitle = styled.div`
  ${fonts.P2};
  margin-bottom: 20px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FunctionTitle = styled.div`
  ${fonts.P2};
  font-weight: 600;
`;

export const Description = styled.div`
  ${fonts.P1};
  color: ${theme.colors.gray[300]};
  margin-top: 4px;
`;