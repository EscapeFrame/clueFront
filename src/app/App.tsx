import { ThemeProvider, Global } from '@emotion/react';
import { theme } from '@/shared/theme/theme.styles';
import { globalStyles } from '@/shared/theme/global';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '@/entities/Context/LoginContext';
import { AppRoutes } from '@/app/router/AppRoutes';
import { useAccessToken } from './hooks/useAccessToken';
import Navbar from '@/widgets/Navbar/index';
import { USERJwtRequest } from '@/entities/User/model/user.atom';

export default function App() { 
  const { accessToken, setAccessToken } = useAccessToken();

  // 하드코딩된 예시 데이터
  const role1: USERJwtRequest = {
    role: 'STU',
    userId: '20250001',
    username: '공덕현',
    profileImg: 'sample.png',
  };

  const role2: USERJwtRequest = {
    role: 'TCH',
    userId: 'TCH001',
    username: '유근찬',
    profileImg: 'sample.png',
  };

  const role = role1;

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Router>
          <UserContext.Provider value={{ accessToken, setAccessToken }}>
            <Navbar
              role={role.role}
              userId={role.userId}
              name={role.username}
              myImage={role.profileImg}
            />
            <AppRoutes role={role.role} />
          </UserContext.Provider>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}