import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme, ThemeType } from './theme.styles';
import { globalStyles } from './global';
import { Global } from '@emotion/react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'light'
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // localStorage에서 저장된 테마 모드 불러오기
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;

    // 시스템 테마 감지
    if (!savedMode) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : defaultMode;
    }

    return savedMode;
  });

  const theme = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    // 테마 변경 시 localStorage에 저장
    localStorage.setItem('theme-mode', mode);

    // body에 data attribute 추가 (CSS 변수 사용 시 유용)
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  useEffect(() => {
    // 시스템 테마 변경 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const savedMode = localStorage.getItem('theme-mode');
      // localStorage에 저장된 모드가 없을 때만 시스템 테마 따르기
      if (!savedMode) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const value: ThemeContextType = {
    theme,
    mode,
    toggleTheme,
    setTheme: setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <EmotionThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
