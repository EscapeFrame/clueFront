import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
`;

export const Tittle = styled.h1`
    ${fonts.P5}
    margin-bottom: 2rem;
    color: ${theme.colors.black};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  label {
    margin-bottom: 0.5rem;
    ${fonts.P3}
    color: ${theme.colors.black};
  }

    input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 12px;
    font-size: 1rem;

    &:focus {
      border-color: ${theme.colors.blue[500]};
      outline: none;
    }
  }
`;

export const SubmitButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 0.75rem;
  background-color: ${theme.colors.blue[500]};
  color: ${theme.colors.white};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.blue[600]};
  }

  &:disabled {
    background-color: ${theme.colors.gray[300]};
    cursor: not-allowed;
  }
`;