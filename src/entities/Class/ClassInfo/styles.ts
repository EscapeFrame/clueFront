import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { colors } from '@/shared/theme/theme.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${colors.white};
  padding: 2rem 14rem;
  overflow: hidden;
  width: 100%;
  gap: 5px;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    gap: 1rem;
  }
`;

export const Title = styled.h2`
  font-weight: 700;
  ${fonts.P5}
  margin: 0;
  color: ${colors.black};
`;

export const Description = styled.p`
  ${fonts.P2}
  color: ${colors.gray[4]};
  margin: 0;
  padding: 0;
`;

export const TeacherRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${colors.gray[4]};
  ${fonts.P2}

  @media (max-width: 1200px) {
    ${fonts.P1}
  }

  @media (max-width: 768px) {
    gap: 6px;
    ${fonts.P1}
  }
`;