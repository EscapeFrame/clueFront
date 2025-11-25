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
    ${fonts.P3};
    margin-bottom: 10px;
  }
`;

export const Section = styled.div`
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    margin-bottom: 15px;
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

export const FunctionTitle = styled.div`
  ${fonts.P2};
  font-weight: 600;

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const Description = styled.div`
  ${fonts.P2};
  color: ${colors.gray[4]};
  margin-top: 4px;

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const ModalWarning = styled.strong`
  color: ${colors.red[3]};
  ${fonts.P2}

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const ErrorMessage = styled.div`
  border: 1px solid ${colors.gray[4]};
  color: ${colors.red[3]};
  padding: 0.75rem 1rem;
  border-radius: 6px;
  ${fonts.P2}
  margin-top: 1rem;

  @media (max-width: 1200px) {
    ${fonts.P3};
    padding: 0.6rem 0.8rem;
  }

  @media (max-width: 768px) {
    ${fonts.P3};
    padding: 0.5rem 0.6rem;
  }
`;