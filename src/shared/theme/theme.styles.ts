export const blue = {
  100: '#EBF5FF',
  200: '#E4F1FF',
  300: '#D6EAFF',
  400: '#B7DAFF',
  500: '#86C1FF',
  600: '#578FCA',
  700: '#3f6db8',
  800: '#0077FF'
};

export const gray = {
  100: '#F3F3F3',
  200: '#F5F5F5',
  300: '#CCCCCC',
  400: '#DDDDDD',
  500: '#666666',
  600: '#999999',
};

export const theme = {
  colors: {
    blue,
    gray,
    white: '#FFFFFF',
    black: '#111111',
    red: '#FF6363',
  },
};

export type ThemeType = typeof theme;