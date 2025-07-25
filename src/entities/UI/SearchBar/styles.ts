import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';
import { IoSearch } from 'react-icons/io5';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.gray[200]};
  border-radius: 8px;
  padding: 0.6rem 1rem;
  width: 20rem;
`;

export const SearchField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  ${fonts.P1}
`;

export const SearchIcon = styled(IoSearch)`
  color: ${theme.colors.gray[500]};
  margin-left: 0.6rem;
  cursor: pointer;
`;