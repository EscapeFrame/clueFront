import styled from "styled-components";
import { theme } from '@/shared/theme/theme.styles';

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

export const LinkInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const LinkButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  color: #9ca3af;

  &:hover {
    background-color: #f3f4f6;
    color: #4b5563;
  }
`;

export const AddLinkButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${theme.colors.blue[800]};
  margin-top: 0.5rem;

  &:hover {
    color: #004ADF;
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

