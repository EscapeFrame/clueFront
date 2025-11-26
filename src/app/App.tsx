import { ThemeProvider } from '@/shared/theme/ThemeContext';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, useLocation, matchPath } from 'react-router-dom';
import { UserContext } from '@/entities/Context/LoginContext';
import { AppRoutes } from '@/app/router/AppRoutes';
import { useAuth } from './hooks/useAccessToken';
import Navbar from '@/widgets/Navbar/index';

export default function App() {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Router>
          <AuthWrapper />
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}

function AuthWrapper() {
  const { accessToken, user, setAuthInfo, removeAuthInfo, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // 또는 로딩 스피너를 여기에 렌더링
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
      <UserContext.Provider value={{ accessToken, user, setAuthInfo, removeAuthInfo }}>
      {!hideNavbar && (
        <Navbar />
      )}
      <AppRoutes role={role} loading={loading} />
    </UserContext.Provider>
  );
}