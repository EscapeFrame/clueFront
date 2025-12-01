import styled from 'styled-components';
import { gray } from '@/shared/theme/theme.styles';

export const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  position: relative;
  border: 6px solid rgba(37,99,235,0.12);
  border-top-color: rgba(37,99,235,0.9);
  animation: spin 1s cubic-bezier(.4,.0,.2,1) infinite;
  box-shadow: 0 6px 20px rgba(37,99,235,0.08);

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background: #2563EB;
    border-radius: 50%;
    box-shadow: 0 6px 18px rgba(37,99,235,0.18);
    animation: pulse 1.6s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(0.9); opacity: .9; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: .65; }
    100% { transform: translate(-50%, -50%) scale(0.9); opacity: .9; }
  }
`;

export const Message = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${gray[600]};
`;

export const PageOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1.5rem;
  height: calc(125vh - 60px);
`;

export const PageSpinnerWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
