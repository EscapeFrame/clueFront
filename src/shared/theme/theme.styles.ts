// ============================================
// Design Tokens - 통합 디자인 시스템
// ============================================

// Spacing Scale (4px 기반)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '48px',
  '4xl': '64px',
  '5xl': '80px',
} as const;

// Border Radius
export const radii = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const;

// Transitions
export const transitions = {
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '350ms ease-in-out',
} as const;

// ============================================
// Color System - 라이트/다크 모드 지원
// ============================================

// Light Mode Colors
const lightColors = {
  // Primary
  primary: '#0077FF',
  primaryHover: '#0066DD',
  primaryActive: '#0055BB',

  // Background
  background: '#FFFFFF',
  backgroundSecondary: '#FAFAFA',
  backgroundTertiary: '#F7F7F7',

  // Surface
  surface: '#FFFFFF',
  surfaceHover: '#F7F7F7',

  // Text
  text: '#18191A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#FFFFFF',

  // Border
  border: '#E9E9E9',
  borderStrong: '#D9D9D9',
  borderSubtle: '#F7F7F7',

  // States
  success: '#4CAF50',
  warning: '#FF9E5E',
  error: '#FF6D6D',
  info: '#0077FF',

  // Gray Scale
  gray: {
    50: '#FAFAFA',
    100: '#F7F7F7',
    200: '#F3F3F3',
    300: '#E9E9E9',
    400: '#D9D9D9',
    500: '#CCCCCC',
    600: '#999999',
    700: '#666666',
    800: '#333333',
    900: '#18191A',
  },

  // Blue Scale
  blue: {
    50: '#EBF5FF',
    100: '#EBF6FF',
    200: '#E4F1FF',
    300: '#D6EAFF',
    400: '#B7DAFF',
    500: '#86C1FF',
    600: '#578FCA',
    700: '#4191E5',
    800: '#0077FF',
    900: '#0055BB',
  },

  // Red Scale
  red: {
    50: '#FFF5F5',
    100: '#FFE3E9',
    200: '#FFCCD5',
    300: '#EBA8A8',
    400: '#FF9999',
    500: '#FF6D6D',
    600: '#E65555',
    700: '#CC4444',
    800: '#B33333',
    900: '#992222',
  },

  // Green Scale (Success)
  green: {
    50: '#F0FFF4',
    100: '#C6F6D5',
    200: '#9AE6B4',
    300: '#68D391',
    400: '#4CAF50',
    500: '#38A169',
    600: '#2F855A',
    700: '#276749',
    800: '#22543D',
    900: '#1C4532',
  },

  // Orange Scale (Warning)
  orange: {
    50: '#FFF5EB',
    100: '#FFDEC8',
    200: '#FFC8A0',
    300: '#FFB378',
    400: '#FF9E5E',
    500: '#FF8A3D',
    600: '#E67A35',
    700: '#CC6A2E',
    800: '#B35A26',
    900: '#994A1F',
  },

  // NPC Character Colors (gamification)
  npc: {
    owl: ['#FFDEC8', '#FF9E5E'] as const,
    haeyul: ['#EBF6FF', '#86C1FF'] as const,
    panda: ['#FFDCF1', '#E491BF'] as const,
    ferret: ['#F7F7F7', '#D9D9D9'] as const,
    I: ['#F4EBFF', '#B77FFF'] as const,
    koala: ['#FFF8D2', '#F3E17E'] as const,
  },
} as const;

// Dark Mode Colors
const darkColors = {
  // Primary
  primary: '#86C1FF',
  primaryHover: '#B7DAFF',
  primaryActive: '#D6EAFF',

  // Background
  background: '#18191A',
  backgroundSecondary: '#1E1F20',
  backgroundTertiary: '#252627',

  // Surface
  surface: '#252627',
  surfaceHover: '#2D2E2F',

  // Text
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textTertiary: '#999999',
  textInverse: '#18191A',

  // Border
  border: '#333333',
  borderStrong: '#444444',
  borderSubtle: '#2D2E2F',

  // States
  success: '#68D391',
  warning: '#FFB378',
  error: '#FF9999',
  info: '#86C1FF',

  // Gray Scale (inverted)
  gray: {
    50: '#18191A',
    100: '#252627',
    200: '#2D2E2F',
    300: '#333333',
    400: '#444444',
    500: '#666666',
    600: '#999999',
    700: '#CCCCCC',
    800: '#E9E9E9',
    900: '#FAFAFA',
  },

  // Blue Scale (adjusted for dark mode)
  blue: {
    50: '#0055BB',
    100: '#0066DD',
    200: '#0077FF',
    300: '#4191E5',
    400: '#578FCA',
    500: '#86C1FF',
    600: '#B7DAFF',
    700: '#D6EAFF',
    800: '#E4F1FF',
    900: '#EBF6FF',
  },

  // Red Scale
  red: {
    50: '#992222',
    100: '#B33333',
    200: '#CC4444',
    300: '#E65555',
    400: '#FF6D6D',
    500: '#FF9999',
    600: '#EBA8A8',
    700: '#FFCCD5',
    800: '#FFE3E9',
    900: '#FFF5F5',
  },

  // Green Scale
  green: {
    50: '#1C4532',
    100: '#22543D',
    200: '#276749',
    300: '#2F855A',
    400: '#38A169',
    500: '#4CAF50',
    600: '#68D391',
    700: '#9AE6B4',
    800: '#C6F6D5',
    900: '#F0FFF4',
  },

  // Orange Scale
  orange: {
    50: '#994A1F',
    100: '#B35A26',
    200: '#CC6A2E',
    300: '#E67A35',
    400: '#FF8A3D',
    500: '#FF9E5E',
    600: '#FFB378',
    700: '#FFC8A0',
    800: '#FFDEC8',
    900: '#FFF5EB',
  },

  // NPC Character Colors (same for both modes)
  npc: {
    owl: ['#FFDEC8', '#FF9E5E'] as const,
    haeyul: ['#EBF6FF', '#86C1FF'] as const,
    panda: ['#FFDCF1', '#E491BF'] as const,
    ferret: ['#F7F7F7', '#D9D9D9'] as const,
    I: ['#F4EBFF', '#B77FFF'] as const,
    koala: ['#FFF8D2', '#F3E17E'] as const,
  },
} as const;

// ============================================
// Theme Objects
// ============================================

export const lightTheme = {
  colors: lightColors,
  spacing,
  radii,
  shadows,
  transitions,
  mode: 'light' as const,
} as const;

export const darkTheme = {
  colors: darkColors,
  spacing,
  radii,
  shadows,
  transitions,
  mode: 'dark' as const,
} as const;

export const theme = lightTheme;

export type ThemeType = typeof lightTheme | typeof darkTheme;

// ============================================
// Backward Compatibility Exports
// ============================================

// 기존 코드와의 호환성을 위한 export (with legacy color indexing)
export const colors = {
  ...lightColors,
  // 레거시 white/black 지원
  white: lightColors.background,
  black: lightColors.text,

  // 레거시 gray 인덱스 지원 (0-4 -> 50-700)
  gray: {
    ...lightColors.gray,
    0: lightColors.gray[50],
    1: lightColors.gray[100],
    2: lightColors.gray[300],
    3: lightColors.gray[400],
    4: lightColors.gray[700],
  } as typeof lightColors.gray & { 0: string; 1: string; 2: string; 3: string; 4: string },

  // 레거시 blue 인덱스 지원 (light1-4, dep1-2)
  blue: {
    ...lightColors.blue,
    light1: lightColors.blue[100],
    light2: lightColors.blue[300],
    light3: lightColors.blue[400],
    light4: lightColors.blue[500],
    dep1: lightColors.blue[700],
    dep2: lightColors.blue[600],
  } as typeof lightColors.blue & { light1: string; light2: string; light3: string; light4: string; dep1: string; dep2: string },

  // 레거시 red 인덱스 지원 (1-3 -> 100-500)
  red: {
    ...lightColors.red,
    1: lightColors.red[100],
    2: lightColors.red[300],
    3: lightColors.red[500],
  } as typeof lightColors.red & { 1: string; 2: string; 3: string },
};

// 레거시 호환성 (기존 코드가 깨지지 않도록)
export const blue = {
  100: lightColors.blue[100],
  200: lightColors.blue[200],
  300: lightColors.blue[300],
  400: lightColors.blue[400],
  500: lightColors.blue[500],
  600: lightColors.blue[600],
  700: lightColors.blue[700],
  800: lightColors.blue[800],
};

export const gray = {
  100: lightColors.gray[100],
  200: lightColors.gray[200],
  300: lightColors.gray[300],
  400: lightColors.gray[400],
  500: lightColors.gray[500],
  600: lightColors.gray[600],
};