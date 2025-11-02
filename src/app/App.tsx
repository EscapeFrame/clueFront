import { ThemeProvider, Global } from '@emotion/react';
import { theme } from '@/shared/theme/theme.styles';
import { globalStyles } from '@/shared/theme/global';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, useLocation, matchPath } from 'react-router-dom';
import { UserContext } from '@/entities/Context/LoginContext';
import { AppRoutes } from '@/app/router/AppRoutes';
import { useAuth } from './hooks/useAccessToken';
import Navbar from '@/widgets/Navbar/index';

export default function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Router>
          <AuthWrapper />
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}

function AuthWrapper() {
  const { accessToken, refreshToken, user, setAuthInfo, removeAuthInfo, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null; // 또는 로딩 스피너를 여기에 렌더링
  }

  let role = user?.role || null;
  if (role === 'STUDENT') role = 'STU';
  else if (role === 'TEACHER') role = 'TCH';
  // Hide Navbar on markdown editor route
  const hideNavbar = !!matchPath(
    '/class/:classRoomId/:directoryId/make/lesson/markdown',
    location.pathname
  );
  return (
      <UserContext.Provider value={{ accessToken, refreshToken, user, setAuthInfo, removeAuthInfo }}>
      {!hideNavbar && (
        <Navbar userId={Number(user?.userId) || 0} username={user?.username || ''} role={role} />
      )}
      <AppRoutes role={role} />
    </UserContext.Provider>
  );
}