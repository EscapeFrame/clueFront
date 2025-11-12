import styled from "styled-components";
import { theme } from '@/shared/theme/theme.styles';

export const Wrapper = styled.div`
  padding: 2rem 10rem;
  background-color: #f9fafb;
  min-height: 100vh;
`;

export const StepBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 5rem;
`;

export const Step = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-grow: 1;

  span {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? "#0b5fff" : "#e5e7eb")};
    color: ${({ active }) => (active ? "white" : "#6b7280")};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    z-index: 1;
  }

  label {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: ${({ active }) => (active ? "#0b5fff" : "#6b7280")};
    font-weight: 500;
  }
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #374151;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    &:focus {
      outline: 2px solid #3b82f6;
      border-color: transparent;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

// label에서 div로 변경
export const UploadBox = styled.div<{ isDragOver?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  flex-direction: column;
  gap: 0.5rem;
  color: #6b7280;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ isDragOver }) => (isDragOver ? "#e0e7ff" : "#f3f4f6")};
  }

  svg {
    stroke: #9ca3af;
  }
`;

export const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const KeywordItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;

  button {
    all: unset;
    cursor: pointer;
    font-weight: 700;
    color: #4f46e5;
    &:hover {
      color: #3730a3;
    }
  }
`;

export const FilesList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;

  .left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .meta {
    display: flex;
    flex-direction: column;
  }

  .name {
    font-weight: 500;
    color: #374151;
  }

  .size {
    font-size: 0.875rem;
    color: #6b7280;
  }

  button {
    all: unset;
    cursor: pointer;
    color: #9ca3af;
    padding: 0.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #f3f4f6;
      color: #4b5563;
    }
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  flex: 1;
  border-top: 1px solid #e5e7eb;
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 0.625rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 6px;
  width: 100%;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  ${({ variant }) =>
    variant === "primary" &&
    `
        background-color: ${theme.colors.blue[800]};
        color: white;
        border-color: ${theme.colors.blue[800]};

        &:hover {
            background-color: #004ADF;
        }
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
        background-color: white;
        color: #374151;
        border-color: #d1d5db;

        &:hover {
            background-color: #f9fafb;
        }
    `}

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #d1d5db;
    color: #6b7280;
    border-color: #d1d5db;
    cursor: not-allowed;
  `}
`;

export const SvgIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: none;
  stroke: #6b7280;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export const FileIcon = styled.svg`
  width: 20px;
  height: 20px;
  viewbox: 0 0 24 24;
  fill: none;
  stroke: #6b7280;
  stroke-width: 1.5;
`;
