import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { colors, ThemeType } from '@/shared/theme/theme.styles';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-height: 80vh;
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
  color: ${(props) => props.theme.colors.gray[500]};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const baseInputStyles = (props: any) => `
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props.theme.colors.gray[300]};
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props.theme.colors.blue[500]};
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

export const RadioGroup = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 15px;
      color: ${(props) => props.theme.colors.gray[500]};
    }

    input[type='radio'] {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;

      width: 18px;
      height: 18px;
      border: 2px solid ${(props) => props.theme.colors.gray[300]};
      border-radius: 4px;
      margin-right: 8px;
      cursor: pointer;
      position: relative;
      outline: none;
      transition: all 0.2s ease;

      &:checked {
        background-color: ${(props) => props.theme.colors.blue[500]};
        border-color: ${(props) => props.theme.colors.blue[500]};
      }

      /* 체크 표시 아이콘 */
      &:checked::after {
        content: '✔';
        font-size: 14px;
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
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
  background-color: ${(props) => props.theme.colors.blue[500]};
  &:hover {
    background-color: ${(props) => props.theme.colors.blue[600]};
  }
`;

export const RemoveButton = styled.button`
  ${smallButton}
  background-color: ${(props) => props.theme.colors.red};
  &:hover {
    opacity: 0.8;
  }
`;

export const FileUploadArea = styled.div<{ isDragOver: boolean }>`
  border: ${({ isDragOver }) =>
  isDragOver
    ? `2px solid ${colors.primary}`
    : `2px dashed ${colors.gray[3]}`};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 12px;
  text-align: center;
  background: ${({ isDragOver }) => isDragOver ? colors.gray[2] : colors.gray[1]};
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