import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const LoginButtonStyled = styled.button`
  background: ${theme.colors.white};
  color: ${theme.colors.black};
  border-radius: 8px;
  border : 1px solid ${theme.colors.gray[600]};
  padding: 0.8em 7em;
  ${fonts.P4}
  cursor: pointer;
  margin: 0 0.5em;
  transition: background 0.2s;
  &:hover {
    background: ${theme.colors.blue[100]};
  }
`;

export const LogoutButtonStyled = styled.button`
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.75em 2em;
  font-size: 1.1em;
  cursor: pointer;
  margin: 0 0.5em;
  transition: background 0.2s;
  &:hover {
    background: #bdbdbd;
  }
`; 