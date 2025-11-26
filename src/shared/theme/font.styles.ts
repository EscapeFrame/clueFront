import { css } from '@emotion/react';

// ============================================
// Typography System - 확장된 타이포그래피
// ============================================

// Font Weights
export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

// Font Sizes
export const fontSizes = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '22px',
  '3xl': '24px',
  '4xl': '28px',
  '5xl': '32px',
  '6xl': '36px',
  '7xl': '48px',
  '8xl': '64px',
} as const;

// Line Heights
export const lineHeights = {
  tight: '120%',
  normal: '150%',
  relaxed: '170%',
  loose: '200%',
} as const;

// Heading Styles
export const headings = {
  h1: css({
    fontSize: fontSizes['7xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: '-0.02em',
  }),
  h2: css({
    fontSize: fontSizes['6xl'],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: '-0.01em',
  }),
  h3: css({
    fontSize: fontSizes['5xl'],
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.tight,
  }),
  h4: css({
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.normal,
  }),
  h5: css({
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  }),
  h6: css({
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  }),
} as const;

// Body Text Styles
export const body = {
  large: css({
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  }),
  base: css({
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  }),
  small: css({
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  }),
  tiny: css({
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal,
  }),
} as const;

// Text Variants (with different weights)
export const textVariants = {
  // Large variants
  largeBold: css({
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.normal,
  }),
  largeMedium: css({
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  }),

  // Base variants
  baseBold: css({
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.normal,
  }),
  baseMedium: css({
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  }),

  // Small variants
  smallBold: css({
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.normal,
  }),
  smallMedium: css({
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  }),

  // Tiny variants
  tinyBold: css({
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.normal,
  }),
  tinyMedium: css({
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.normal,
  }),
} as const;

// ============================================
// Backward Compatibility - 기존 P1~P5 유지
// ============================================

export const fonts = {
  // 레거시 호환성
  P1: css({ fontSize: '12px', fontWeight: '400', lineHeight: '120%' }),
  P2: css({ fontSize: '16px', fontWeight: '400', lineHeight: '120%' }),
  P3: css({ fontSize: '18px', fontWeight: '400', lineHeight: '120%' }),
  P4: css({ fontSize: '22px', fontWeight: '400', lineHeight: '120%' }),
  P5: css({ fontSize: '28px', fontWeight: '400', lineHeight: '120%' }),

  // 새로운 시스템 (권장)
  ...headings,
  ...body,
  ...textVariants,
} as const;

// 개별 export (tree-shaking을 위해)
export const typography = {
  fontWeights,
  fontSizes,
  lineHeights,
  headings,
  body,
  textVariants,
  fonts,
} as const;