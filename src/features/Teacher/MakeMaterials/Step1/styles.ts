import styled from "styled-components";
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Card = styled.div`
  background-color: ${colors.white};;
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
    font-size: 1.25rem;
    font-weight: 600;
    color: ${colors.black};;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid ${colors.gray[2]};
    border-radius: 6px;
    font-size: 1.25rem;
    &:focus {
      outline: 2px solid ${colors.primary};
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
  background-color: ${colors.gray[1]};
  color: ${colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 1.25rem;
  font-weight: 500;

  button {
    all: unset;
    cursor: pointer;
    font-weight: 700;
    color: ${colors.primary};
    &:hover {
      color: ${colors.blue.dep2};;
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
  color: ${colors.gray[3]};;

  &:hover {
    background-color: ${colors.gray[2]};;
    color: ${colors.gray[4]};;
  }
`;

export const AddLinkButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${colors.blue.dep1};
  margin-top: 0.5rem;

  &:hover {
    color: ${colors.primary};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  flex: 1;
  border-top: 1px solid ${colors.gray[3]};
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 0.625rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 6px;
  width: 100%;
  font-weight: 600;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;

  ${({ variant }) =>
    variant === "primary" &&
    `
        background-color: ${colors.primary};
        color: white;
        border-color: ${colors.primary};

        &:hover {
            background-color: ${colors.blue.dep2};;
        }
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
        background-color: white;
        color: ${colors.black};;
        border-color: ${colors.gray[3]};;

        &:hover {
            background-color: ${colors.gray[1]};;
        }
    `}

  ${({ disabled }) =>
    disabled &&
    `
    background-color: ${colors.gray[1]};;
    color: ${colors.gray[4]};;
    border-color: ${colors.gray[1]};;
    cursor: not-allowed;
  `}
`;

export const SpinnerOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1.5rem;
`;

export const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 6px solid rgba(37,99,235,0.12);
  border-top-color: rgba(37,99,235,0.9);
  animation: spin 1s cubic-bezier(.4,.0,.2,1) infinite;
  box-shadow: 0 6px 20px rgba(37,99,235,0.08);

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background: #2563EB;
    border-radius: 50%;
    box-shadow: 0 6px 18px rgba(37,99,235,0.18);
    animation: pulse 1.6s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(0.9); opacity: .9; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: .65; }
    100% { transform: translate(-50%, -50%) scale(0.9); opacity: .9; }
  }
`;

export const LoadingText = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${colors.gray[4]};
`;
