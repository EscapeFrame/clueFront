import styled from '@emotion/styled';
import { white } from '@/shared/styles/theme.styles';
import { fonts } from '@/shared/styles/font.styles';

export const Container = styled.div`
  background-color: ${white};
  margin-bottom: 40px;
`;

export const GradeClassWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

export const Title = styled.div`
    ${fonts.P4};
    font-weight:600;
`;

export const SubTitle = styled.div`
  ${fonts.P2};
  margin-bottom: 20px;
`;