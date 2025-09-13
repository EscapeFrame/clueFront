import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  background-color: ${theme.colors.white};
  margin-bottom: 40px;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
  }
`;

export const GradeClassWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Title = styled.div`
    ${fonts.P4};
    font-weight:600;
    @media (max-width: 600px) {
      ${fonts.P3};
      margin-bottom: 10px;
    }
`;

export const SubTitle = styled.div`
  ${fonts.P2};
  margin-bottom: 20px;
  @media (max-width: 600px) {
    ${fonts.P3};
  }
`;