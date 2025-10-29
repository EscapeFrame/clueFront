import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
  max-height: 70vh;
  overflow-y: auto;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  ${fonts.P2};
  font-weight: 600;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 16px;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    ${fonts.P3};
    cursor: pointer;
  }

  input[type='radio'] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 16px;
    height: 16px;
    border: 2px solid #ccc;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: white;

    &:checked {
      background-color: #b7daff;
      border-color: #0077ff;
    }

    &:checked::after {
      content: '✔';
      font-size: 12px;
      font-weight: bold;
      color: #0077ff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 1;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  ${fonts.P3};

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  min-height: 150px;
  resize: vertical;
  ${fonts.P3};

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

export const FileUploadArea = styled.div<{ isDragOver: boolean }>`
  border: 2px dashed ${({ isDragOver }) => (isDragOver ? '#007aff' : '#d9d9d9')};
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  color: #888;
  transition: border-color 0.2s;

  &:hover {
    border-color: #007aff;
  }
`;

export const AttachmentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

export const AttachmentItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff3b30;
  cursor: pointer;
  font-size: 16px;
`;
