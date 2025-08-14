import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  padding: 2rem 8rem;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: ${fonts.P5};
  color: #333;
  margin-bottom: 16px;
`;

export const InfoBox = styled.div`
  background: #e3f2fd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InfoIcon = styled.span`
  color: #2196f3;
  font-size: 18px;
  font-weight: bold;
`;

export const InfoText = styled.p`
  color: #1976d2;
  font-size: 14px;
  margin: 0;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;

export const LeftPanel = styled.div`
  padding-top: 2.5em;
  width: 50%;
`;

export const TeacherInput = styled.div`
  margin-bottom: 16px;
`;

export const TeacherLabel = styled.label`
  display: block;
  font-size: ${fonts.P2};
  color: #333;
  margin-bottom: 8px;
`;

export const TeacherInputField = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: ${fonts.P1};
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PDFB = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: ${fonts.P1};
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${theme.colors.gray[100]};
  color: #333;
  &:hover {
    background: #f5f5f5;
  }
`;

export const GoogleSheetB = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: ${fonts.P1};
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${theme.colors.blue[500]};
  color: #333;
`;

export const RightPanel = styled.div`
  width: 50%;
`;