import { theme } from '@/shared/theme/theme.styles';
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
  background: ${theme.colors.white};
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
  background: ${'#0077FF'};
  color: #fff;
  cursor: pointer;
  font-weight: 600;
`;

export const FileName = styled.p`
  margin: 0;
  color: ${theme.colors.black || '#222'};
  font-size: 14px;
`;

export const Status = styled.p<{ variant?: 'error' | 'info' | 'success' }>`
  margin: 8px 0 0 0;
  font-size: 14px;
  color: ${props => props.variant === 'error' ? '#d93025' : props.variant === 'success' ? '#188038' : '#334155'};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;