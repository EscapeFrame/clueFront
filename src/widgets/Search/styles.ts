import styled from '@emotion/styled';
import { gray } from '@/shared/styles/theme.styles';
import { IoSearch } from 'react-icons/io5';
import { fonts } from '@/shared/styles/font.styles';

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${gray[100]};
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
  color: ${gray[300]};
  margin-left: 0.6rem;
  cursor: pointer;
`;