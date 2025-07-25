import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalWrapper = styled.div<{ isWarning?: boolean }>`
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  padding: 20px;
  box-shadow: ${({ isWarning }) =>
    isWarning ? '0 0 15px 5px red' : '0 0 10px rgba(0,0,0,0.1)'};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const Notes = styled.p`
  margin-top: 8px;
  color: #555;
  font-size: 0.9rem;
`;

export const Content = styled.div`
  margin-bottom: 20px;
  padding: 0;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const UploadBox = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 24px;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: #777;
    font-size: 0.95rem;
    cursor: pointer;
  }

  input[type='file'] {
    display: none;
  }
`;

export const InputArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  resize: vertical;
`;

export const ContentText = styled.p`
  font-size: 0.95rem;
  color: #666;
`;

// InputModal
export const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 12px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

// FileModal
import { LuUpload } from "react-icons/lu";

export const DropZone = styled.label<{ isDragOver: boolean }>`
  display: block;
  padding: 32px;
  text-align: center;
  border: 2px dashed ${({ isDragOver }) => (isDragOver ? '#60a5fa' : '#d1d5db')};
  background-color: ${({ isDragOver }) => (isDragOver ? '#eff6ff' : '#f9fafb')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  p {
    margin-top: 12px;
    color: #4b5563;
    font-size: 0.95rem;
  }
`;

export const UploadIcon = styled(LuUpload)`
  font-size: 2.5rem;
  color: #9ca3af;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

const ButtonBase = styled.button`
  flex: 1;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
`;

export const CancelButton = styled(ButtonBase)`
  background: #fff;
  border: 1px solid #d1d5db;
  color: #374151;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const ConfirmButton = styled(ButtonBase)`
  background: #3b82f6;
  color: #fff;
  border: none;

  &:hover {
    background-color: #2563eb;
  }
`;