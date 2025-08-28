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
import { useState } from 'react';

// 학생/선생 정보 예시
const STUInfo: USERJwtRequest = {
  role: 'STU',
  userId: '2102',
  username: '공덕',
  myImage: '/sample.jpg'
};

const TCHInfo: USERJwtRequest = {
  role: 'TCH',
  userId: 'teacher01',
  username: '유근찬',
  myImage: '/sample.jpg'
};

export default function App() {
  const { accessToken, setAccessToken } = useAccessToken();
  
  // 현재 로그인한 유저 (테스트용)
  const [user, setUser] = useState<USERJwtRequest | null>(STUInfo);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Router>
          <UserContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
            <Navbar
              userId={user?.userId || ''}
              name={user?.username || ''}
              myImage={user?.myImage || ''}
            />
            <AppRoutes role={user?.role || 'STU'} />
          </UserContext.Provider>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}