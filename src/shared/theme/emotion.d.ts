import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      background: string;
      backgroundSecondary: string;
      backgroundTertiary: string;
      surface: string;
      surfaceHover: string;
      text: string;
      textSecondary: string;
      textTertiary: string;
      textInverse: string;
      border: string;
      borderStrong: string;
      borderSubtle: string;
      success: string;
      warning: string;
      error: string;
      info: string;
      gray: Record<number, string>;
      blue: Record<number, string>;
      red: Record<number, string>;
      green: Record<number, string>;
      orange: Record<number, string>;
      npc: {
        owl: readonly [string, string];
        haeyul: readonly [string, string];
        panda: readonly [string, string];
        ferret: readonly [string, string];
        I: readonly [string, string];
        koala: readonly [string, string];
      };
    };
    spacing: Record<string, string>;
    radii: Record<string, string>;
    shadows: Record<string, string>;
    transitions: Record<string, string>;
    mode: 'light' | 'dark';
  }
}