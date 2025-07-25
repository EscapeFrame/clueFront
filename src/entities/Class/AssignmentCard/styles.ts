import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

// 상태 뱃지
export const StatusBadge = styled.span<{ variant?: 'pending' | 'completed' }>`
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  ${fonts.P1}
  white-space: nowrap;
  display: inline-block;

  color: ${theme.colors.black};
  background-color: ${({ variant }) =>
    variant === 'pending' ? theme.colors.blue[500] : theme.colors.white};
  border: ${({ variant }) =>
    variant === 'completed' ? `2px solid ${theme.colors.blue[400]}` : 'none'};
`;

// 카드 레이아웃
export const CardContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${theme.colors.gray[200]};
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease-in-out;
  min-height: 270px;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const Title = styled.h3`
  color: ${theme.colors.black};
  ${fonts.P3}
  font-weight: 600;
  margin: 0;
  flex-grow: 1;
  word-break: break-word;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-grow: 1;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${fonts.P1}
  color: ${theme.colors.gray[500]};

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

// 파일 목록
export const FileListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: #f5f5f5;
  border: 1px solid ${theme.colors.gray[200]};
`;

export const FileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const FileNameText = styled.div`
  ${fonts.P1}
  color: ${theme.colors.black};
`;

export const FileSizeText = styled.div`
  ${fonts.P1}
  color: ${theme.colors.gray[400]};
`;

export const FileRemoveButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray[400]};
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;

  &:hover {
    color: ${theme.colors.black};
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
`;

export const DelChose = styled.input`
  display: none;
`;

export const ChoseFile = styled.label`
  display: inline-block;
  ${fonts.P2}
  margin-top: 0.5rem;
  background-color: ${theme.colors.gray[300]};
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  color: ${theme.colors.black};
  cursor: pointer;
  &:hover {
    color: ${theme.colors.blue[600]};
  }
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;