import styled from 'styled-components';
import { LuUpload } from 'react-icons/lu';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isWarning' && prop !== '$variant',
})<{ $variant?: 'default' | 'warning'; isWarning?: boolean }>`
  background: ${theme.colors.white};
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  padding: 20px;
  overflow: auto;
  box-shadow: ${({ $variant, isWarning }) =>
    $variant === 'warning' || isWarning
      ? '0 0 15px 5px red'
      : '0 0 10px rgba(0,0,0,0.1)'};

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
    ${fonts.P4};
`;

export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  ${fonts.P4};
  cursor: pointer;
  color: ${theme.colors.gray[500]};

  &:hover {
    color: ${theme.colors.black};
  }
`;

export const Notes = styled.p`
  margin-top: 8px;
  color: ${theme.colors.gray[500]};
  ${fonts.P2};
`;

export const Content = styled.div`
  margin-bottom: 20px;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const DropZone = styled.label<{ $isDragOver: boolean }>`
  display: block;
  padding: 32px;
  text-align: center;
  border: 2px dashed ${({ $isDragOver }) => ($isDragOver ? theme.colors.blue[500] : theme.colors.gray[200])};
  background-color: ${({ $isDragOver }) => ($isDragOver ? theme.colors.gray[100] : theme.colors.gray[200])};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  p {
    margin-top: 12px;
    color: ${({ $isDragOver }) => ($isDragOver ? '#2563eb' : theme.colors.gray[500])};
    ${fonts.P3};
  }
`;

export const UploadIcon = styled(LuUpload)<{ $isDragOver?: boolean }>`
  ${fonts.P5};
  color: ${({ $isDragOver }) => ($isDragOver ? '#2563eb' : theme.colors.gray[600])};
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 6px;
  ${fonts.P2};
  color: ${theme.colors.black};
  &::placeholder { color: ${theme.colors.gray[400]}; }
  &:focus { outline: 2px solid ${theme.colors.blue[600]}; outline-offset: 2px; }
`;

const ButtonBase = styled.button`
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
`;

export const CancelButton = styled(ButtonBase)`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[400]};
  color: ${theme.colors.black};

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;

export const ConfirmButton = styled(ButtonBase)`
  background: ${theme.colors.blue[600]};
  color: ${theme.colors.white};
  border: none;

  &:hover {
    background-color: #2563eb;
  }
`;