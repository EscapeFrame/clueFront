import styled from 'styled-components';

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f1f5f9;
  
    h2 {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }
`;

export const CloseButton = styled.button`
    padding: 10px 20px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #475569;
    transition: all 0.2s ease;
  
    &:hover {
      background: #e2e8f0;
      color: #334155;
    }
  
    &:active {
      transform: translateY(1px);
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const InfoRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  
    strong {
      color: #1e293b;
      font-weight: 600;
      font-size: 16px;
    }
  
    span {
      color: #475569;
      font-size: 15px;
      line-height: 1.6;
    }
`;

export const SubmissionStatus = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  
    strong {
      color: #1e293b;
      font-weight: 600;
      font-size: 16px;
    }
`;

export const StatusBadge = styled.span<{ $submitted: boolean | null; $loading?: boolean }>`
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    color: white;
    background: ${props => {
        if (props.$loading) return '#94a3b8';
        if (props.$submitted === null) return '#6b7280';
        return props.$submitted ? '#22c55e' : '#ef4444';
    }};
    
    ${props => props.$loading && `
      position: relative;
      overflow: hidden;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shimmer 1.5s infinite;
      }
      
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `}
`;

export const AttachmentSection = styled.div`
    margin-top: 8px;
    padding: 20px;
    background: #f8fafc;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
  
    strong {
      display: block;
      margin-bottom: 16px;
      color: #1e293b;
      font-weight: 600;
      font-size: 16px;
    }
`;

export const AttachmentList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const AttachmentItem = styled.li`
    padding: 12px 16px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    transition: all 0.2s ease;
  
    &:hover {
      border-color: #3b82f6;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
    }
  
    a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
  
      &:hover {
        color: #2563eb;
      }
  
      &::before {
        content: '📎';
        font-size: 14px;
      }
    }
`;

export const ErrorMessage = styled.div`
    color: #dc2626;
    font-size: 14px;
    margin-top: 4px;
`;