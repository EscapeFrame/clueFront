import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';
import { IoSearch } from 'react-icons/io5';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white[200]};
  border-radius: 8px;
  padding: 0.6rem 1rem;
  width: 20rem;
  max-width: 100%;
  transition: all 0.2s ease;
  border: 1px solid ${theme.colors.gray[400]};

  &:focus-within {
    border: 1px solid ${theme.colors.blue[500]};
    box-shadow: 0 0 0 2px ${theme.colors.blue[100]};
    background-color: ${theme.colors.white};
  }
`;

export const SearchField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  ${fonts.P2}
`;

export const SearchIcon = styled(IoSearch)`
  color: ${theme.colors.gray[500]};
  flex-shrink: 0;
  ${fonts.P1}
  cursor: pointer;
`;