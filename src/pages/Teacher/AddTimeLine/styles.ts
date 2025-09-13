import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  padding: 2rem 8rem;
  width: 100%;

  @media (max-width: 1200px) {
    padding: 2rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem;
  }
`;

export const Title = styled.h1`
  font-size: ${fonts.P5};
  color: ${theme.colors.black};
  margin-bottom: 16px;

  @media (max-width: 1200px) {
    font-size: ${fonts.P4};
  }

  @media (max-width: 768px) {
    font-size: ${fonts.P3};
  }

  @media (max-width: 480px) {
    font-size: ${fonts.P2};
  }
`;

export const InfoBox = styled.div`
  background: ${theme.colors.gray[200]};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const InfoIcon = styled.span`
  color: ${theme.colors.blue[600]};
  ${fonts.P3};
  font-weight: bold;

  @media (max-width: 768px) {
    ${fonts.P3};
  }

  @media (max-width: 480px) {
    ${fonts.P2};
  }
`;

export const InfoText = styled.p`
  color: #1976d2;
  ${fonts.P2};
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P2};
  }

  @media (max-width: 480px) {
    ${fonts.P1};
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const LeftPanel = styled.div`
  padding-top: 2.5em;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 1.5em;
  }
`;

export const TeacherInput = styled.div`
  margin-bottom: 16px;
`;

export const TeacherLabel = styled.label`
  display: block;
  font-size: ${fonts.P2};
  color: ${theme.colors.black};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: ${fonts.P3};
  }

  @media (max-width: 480px) {
    font-size: ${fonts.P2};
  }
`;

export const TeacherInputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${fonts.P1};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2196f3;
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: ${fonts.P2};
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: ${fonts.P3};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const PDFB = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  ${fonts.P1};
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${theme.colors.gray[100]};
  color: ${theme.colors.black};

  &:hover {
    background: ${theme.colors.gray[200]};
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    ${fonts.P2};
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    ${fonts.P3};
  }
`;

export const GoogleSheetB = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  ${fonts.P1};
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${theme.colors.blue[500]};
  color: ${theme.colors.black};

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: ${fonts.P2};
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: ${fonts.P3};
  }
`;

export const RightPanel = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;