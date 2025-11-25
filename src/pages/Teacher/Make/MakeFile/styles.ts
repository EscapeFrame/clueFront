import { colors } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  height: 100%;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 640px;
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(20,20,30,0.06);
  padding: 28px;
  box-sizing: border-box;
`;

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const FileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${colors.primary};
  color: ${colors.white};
  cursor: pointer;
  font-weight: 600;
`;

export const FileName = styled.p`
  margin: 0;
  color: ${colors.black || '#222'};
  font-size: 14px;
`;

export const Status = styled.p<{ variant?: 'error' | 'info' | 'success' }>`
  margin: 8px 0 0 0;
  font-size: 14px;
  color: ${props => props.variant === 'error' ? colors.red[3] : props.variant === 'success' ? colors.primary : colors.black};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;