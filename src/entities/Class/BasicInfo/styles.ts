import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  background-color: ${colors.white};
  margin-bottom: 40px;

  @media (max-width: 1200px) {
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const GradeClassWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;

  @media (max-width: 1200px) {
    gap: 15px;
    margin: 15px 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin: 10px 0;
  }
`;

export const Title = styled.div`
  ${fonts.P4};
  font-weight: 600;

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P2};
  }
`;

export const SubTitle = styled.div`
  ${fonts.P2};
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    ${fonts.P3};
    margin-bottom: 15px;
  }

  @media (max-width: 768px) {
    ${fonts.P2};
    margin-bottom: 10px;
  }
`;