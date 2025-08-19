import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

export const LoginButtonStyled = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75em 2em;
  font-size: 1.1em;
  cursor: pointer;
  margin: 0 0.5em;
  transition: background 0.2s;
  &:hover {
    background: #357ae8;
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