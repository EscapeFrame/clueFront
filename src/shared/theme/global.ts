import { css, Theme } from '@emotion/react';

export const globalStyles = (theme: Theme) => css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI',
                 Roboto, 'Helvetica Neue', Arial, 'Apple SD Gothic Neo', sans-serif;
    /* allow pages to override top offset (e.g., hide navbar) */
    padding-top: var(--app-top-offset, 50px);
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    height: 100%;
    width: 100%;
    min-width: 600px;
    transition: background-color ${theme.transitions.normal}, color ${theme.transitions.normal};
  }

  /* Focus visible styles for accessibility */
  *:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  /* Selection styles */
  ::selection {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.textInverse};
  }

  /* Scrollbar styles (webkit browsers) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.radii.sm};

    &:hover {
      background: ${theme.colors.borderStrong};
    }
  }

  /* Smooth transitions for theme changes */
  * {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-duration: ${theme.transitions.normal};
    transition-timing-function: ease-in-out;
  }
`;