import { css } from '@emotion/react';
import { theme } from './theme.styles';

export const globalStyles = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI',
                 Roboto, 'Helvetica Neue', Arial, 'Apple SD Gothic Neo', sans-serif;
    padding-top: 50px;
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    height: 100%;
    width:100%;

     min-width: 600px;
  }
`;