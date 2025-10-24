import styled from '@emotion/styled';
import { ThemeType } from '@/shared/theme/theme.styles';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 8px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.gray[500]};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const baseInputStyles = `
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.colors.gray[300]};
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.blue[500]};
  }
`;

export const Input = styled.input`
  ${baseInputStyles}
`;

export const Textarea = styled.textarea`
  ${baseInputStyles}
  min-height: 120px;
  resize: vertical;
`;

export const Select = styled.select`
  ${baseInputStyles}
`;

export const UrlInputGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const smallButton = `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
`;

export const AddButton = styled.button`
  ${smallButton}
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.blue[500]};
  &:hover {
    background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.blue[600]};
  }
`;

export const RemoveButton = styled.button`
  ${smallButton}
  background-color: ${({ theme }: { theme: ThemeType }) => theme.colors.red};
  &:hover {
    opacity: 0.8;
  }
`;
