import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.span`
    ${fonts.P2};
  font-weight: 500;
  color: ${theme.colors.black};
`;

export const BarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 12px;
  overflow: hidden;
`;

export const Progress = styled.div`
  height: 100%;
  background-color: ${theme.colors.blue[500]};
  transition: width 0.3s ease;
`;