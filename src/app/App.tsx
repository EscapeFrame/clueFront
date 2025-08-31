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
  const { accessToken, user, setAuthInfo, removeAuthInfo } = useAuth();
  // const role1 = 'STU'; // 프론트 값 확인용(삭제해야댐)
  // const role2 = 'TCH';
  // const role3 = null;

  // const role = role2;

  let role = user?.role || null

  if (role === 'STUDENT') role = 'STU';
  else if (role === "TEACHER") role = 'TCH';
  else role = null;

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Router>
          <UserContext.Provider value={{ accessToken, user, setAuthInfo, removeAuthInfo }}>
            <Navbar userId={Number(user?.userId) || 0} username={user?.username || ''} role={role} />
            <AppRoutes role={role} />
          </UserContext.Provider>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}