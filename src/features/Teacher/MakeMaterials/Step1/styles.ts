import styled from "@emotion/styled";
import { colors } from '@/shared/theme/theme.styles';

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
    font-weight: 600;
    color: ${colors.black};;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid ${colors.gray[2]};
    border-radius: 6px;
    font-size: 1rem;
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
  font-size: 0.875rem;
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
  font-size: 0.875rem;
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

