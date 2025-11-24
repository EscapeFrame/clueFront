import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';
import { IoSearch } from 'react-icons/io5';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[2]};
  color: ${colors.gray[4]};
  border-radius: 8px;
  padding: 0.6rem 1rem;
  width: 20rem;
  max-width: 100%;
  transition: all 0.2s ease;

  &:focus-within {
    border: 1px solid ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.blue.light1};
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
  color: ${colors.gray[4]};
  flex-shrink: 0;
  ${fonts.P1}
  cursor: pointer;
`;