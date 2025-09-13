import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Wrapper = styled.div`
  padding: 0px 24px;

  @media (max-width: 1200px) {
    padding: 0px 20px;
  }

  @media (max-width: 768px) {
    padding: 0px 16px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 24px 0 5px;
  color: ${theme.colors.black};

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
    margin: 16px 0 4px;
  }
`;

export const SubTitle = styled.div`
  ${fonts.P2};
  color: ${theme.colors.gray[600]};
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    ${fonts.P3};
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    ${fonts.P3};
    margin-bottom: 12px;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid ${theme.colors.gray[300]};
  margin: 24px 0;

  @media (max-width: 1200px) {
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    margin: 16px 0;
  }
`;

export const ConfirmButton = styled.button`
  width: 100%;
  margin-top: 32px;
  background: ${theme.colors.blue[500]};
  color: ${theme.colors.white};
  padding: 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.blue[600]};
  }

  @media (max-width: 1200px) {
    margin-top: 24px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 8px;
    ${fonts.P3};
  }
`;