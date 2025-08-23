import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  padding: 2rem 8rem;
  background-color: ${theme.colors.white};
`;

export const TitleFont = styled.h1`
  ${fonts.P5}
  font-weight: 600;
  margin-bottom: 24px;
`;

export const AddButton = styled.button`
  background-color: ${theme.colors.blue[500]};
  border-radius: 6px;
  height: auto;
  cursor: pointer;
  width: 180px;
  height: 36px;
  border-width: 0;
  ${fonts.P2};
`;

export const Flexible = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ModalInput = styled.input`
  width: 100%;
  ${fonts.P2}
  border-radius: 8px;
  padding: 0.6rem 1rem;
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;
`

export const ErrorMessage  = styled.input`
  color: ${theme.colors.red};
`;