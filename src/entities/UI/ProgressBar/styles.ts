import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
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
  color: ${colors.black};
`;

export const BarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${colors.gray[1]};
  border-radius: 12px;
  overflow: hidden;
`;

export const Progress = styled.div`
  height: 100%;
  background-color: ${colors.primary};
  transition: width 0.3s ease;
`;