import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

// 상태 뱃지
export const StatusBadge = styled.span<{ variant?: 'pending' | 'completed' }>`
  padding: 0.25rem;
  border-radius: 16px;
  ${fonts.P1}
  white-space: nowrap;
  display: inline-block;

  color:${({ variant }) =>
    variant === 'completed' ? colors.primary : colors.red[3]};
  background-color: ${({ variant }) =>
    variant === 'completed' ? colors.blue.light1 : colors.red[1]};
  border: 1px solid ${({ variant }) =>
    variant === 'completed' ? `${colors.blue.light4}` : `${colors.red[3]}`};

  @media (max-width: 1200px) {
    ${fonts.P2}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
  }
`;

// 카드 레이아웃
export const CardContainer = styled.div`
  border-radius: 0.5rem;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[3]};
  padding: 1rem;
  transition: box-shadow 0.2s ease-in-out;
  min-height: 12rem;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  @media (max-width: 1200px) {
    padding: 0.8rem;
    min-height: 240px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-height: auto;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.div`
  color: ${colors.black};
  ${fonts.P4}
  font-weight: 600;
  margin: 0;
  word-break: break-word;

  @media (max-width: 1200px) {
    ${fonts.P4}
  }

  @media (max-width: 768px) {
    ${fonts.P4}
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  margin-top: 0;
  align-items: center;
  gap: 0.5rem;
  ${fonts.P2}
  color: ${colors.gray[4]};

  svg {
    width: 1rem;
    height: 1rem;
  }

  @media (max-width: 1200px) {
    ${fonts.P2}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
    flex-wrap: wrap;
  }
`;

// 파일 목록
export const FileListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: ${colors.gray[1]};
  border: 1px solid ${colors.gray[2]};

  @media (max-width: 1200px) {
    padding: 0.4rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
`;

export const FileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;

  svg {
    flex-shrink: 0; // 아이콘이 무조건 보이도록
    width: 1rem;
    height: 1rem;
  }

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

export const FileNameText = styled.div`
  ${fonts.P1}
  color: ${colors.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1 1 auto;
  min-width: 0;

  position: relative;

  &:hover::after {
    content: attr(title);
    position: absolute;
    left: 0;
    top: 100%;
    white-space: normal;
    background: ${colors.gray[0]};
    color: ${colors.black};
    padding: 2px 6px;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    z-index: 10;
    width: max-content;
    max-width: 300px;
  }
`;

export const FileSizeText = styled.div`
  ${fonts.P1}
  color: ${colors.gray[4]};

  @media (max-width: 1200px) {
    ${fonts.P2}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
  }
`;

export const FileRemoveButton = styled.button`
  background: none;
  border: none;
  color: ${colors.gray[4]};
  cursor: pointer;
  ${fonts.P3};
  margin-left: 0.5rem;

  &:hover {
    color: ${colors.black};
  }

  @media (max-width: 768px) {
    ${fonts.P2};
    margin-left: 0;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

export const DelChose = styled.input`
  display: none;
`;

export const ChoseFile = styled.label`
  display: inline-block;
  ${fonts.P2}
  margin-top: 0.5rem;
  background-color: ${colors.gray[3]};
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  color: ${colors.black};
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
  }

  @media (max-width: 1200px) {
    ${fonts.P3}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
    padding: 0.2rem 0.4rem;
  }
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

export const FileUploadArea = styled.div<{ isDragOver: boolean }>`
  border: ${({ isDragOver }) => isDragOver ? `2px solid ${colors.primary}` : `2px dashed ${colors.gray[3]}`};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 12px;
  text-align: center;
  background: ${({ isDragOver }) => isDragOver ? `${colors.blue.light1}` : `${colors.gray[1]}`};
  transition: background 0.2s, border 0.2s;
  cursor: pointer;
  user-select: none;

  @media (max-width: 1200px) {
    padding: 15px;
  }

  @media (max-width: 768px) {
    padding: 10px;
    ${fonts.P2};
  }
`;