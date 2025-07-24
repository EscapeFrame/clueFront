import '@emotion/react';
import { ThemeType } from './theme.styles';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}