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
  const {  setAuthInfo, removeAuthInfo } = useAuth();
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6ImM2YWYyNWVlLTBkYWQtNDJlZS04NWYzLWQ3YjFhZDY4YzEwYyIsInVzZXJuYW1lIjoiYWRtaW4yIiwicm9sZSI6IlRFQUNIRVIiLCJpYXQiOjE3NTczMTg1NzgsImV4cCI6MTc1NzY3ODU3OH0.zIKpZ_79uerS4gvqz4y0YC4NyIwlaZe93u5jNfpFAzI";
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