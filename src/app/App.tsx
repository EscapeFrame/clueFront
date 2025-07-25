import { ThemeProvider, Global } from '@emotion/react';
import { theme } from '@/shared/theme/theme.styles';
import { globalStyles } from '@/shared/theme/global';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '@/entities/Context/LoginContext';
import { AppRoutes } from '@/app/router/AppRoutes';
import { useAccessToken } from './hooks/useAccessToken';
import {STUNumber, Name, MyImg} from '@/shared/types/user'; // 이 부분 어떻게 해야하지..
import Navbar from '@/widgets/Navbar/index';

export default function App() {
  const { accessToken, setAccessToken } = useAccessToken();
  const role1 = 'STU'; // 프론트 값 확인용(삭제해야댐)
  const role2 = 'TCH';

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Router>
          <UserContext.Provider value={{ accessToken, setAccessToken }}>
            <Navbar studentNumber={STUNumber} name={Name} myImage={MyImg} />
            <AppRoutes role={role1} />
          </UserContext.Provider>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}