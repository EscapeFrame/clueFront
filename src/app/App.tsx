import { ThemeProvider, Global } from '@emotion/react';
import { theme } from '@/shared/theme/theme.styles';
import { globalStyles } from '@/shared/theme/global';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
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
  const { setAuthInfo, removeAuthInfo } = useAuth();
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6IjE1YzJjNTBmLTZlZmQtNDI2Mi05YmYwLWQxZDgzMWFlMzE2ZiIsInVzZXJuYW1lIjoiYWRtaW4yIiwicm9sZSI6IlRFQUNIRVIiLCJpYXQiOjE3NTczMjQ1MjQsImV4cCI6MTc1NzY4NDUyNH0.oOSYM3eawdEHa2us6Hclmd0X-YuFdx6ucokS1gFlFI0";
  localStorage.setItem('accessToken', accessToken);

  const user = {
    userId: '2',
    username: '유근찬',
    role: 'TEACHER',
  };

  let role = user?.role || null;
  if (role === 'STUDENT') role = 'STU';
  else if (role === 'TEACHER') role = 'TCH';
  else role = null;

  return (
    <UserContext.Provider value={{ accessToken, user, setAuthInfo, removeAuthInfo }}>
      <Navbar userId={Number(user?.userId) || 0} username={user?.username || ''} role={role} />
      <AppRoutes role={role} />
    </UserContext.Provider>
  );
}