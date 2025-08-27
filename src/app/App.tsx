import { ThemeProvider, Global } from '@emotion/react';
import { theme } from '@/shared/theme/theme.styles';
import { globalStyles } from '@/shared/theme/global';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '@/entities/Context/LoginContext';
import { AppRoutes } from '@/app/router/AppRoutes';
import { useAccessToken } from './hooks/useAccessToken';
import Navbar from '@/widgets/Navbar/index';
import { STUJwtRequest, TCHJwtRequest } from '@/shared/types/user';

// 학생/선생 정보 예시
const STUInfo: STUJwtRequest = {
  role: 'STU',
  userId: '2102',
  username: '공덕',
  myImage: '/sample.jpg'
};

const TCHInfo: TCHJwtRequest = {
  role: 'TCH',
  userId: 'teacher01',
  username: '유근찬',
  myImage: '/sample.jpg'
};

export default function App() {
  const { accessToken, setAccessToken } = useAccessToken();

  // 테스트용으로 학생/선생 중 하나 선택
  const currentUser = STUInfo;

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Router>
          <UserContext.Provider value={{ accessToken, setAccessToken }}>
            <Navbar
              studentNumber={currentUser.userId}
              name={currentUser.username}
              myImage={currentUser.myImage}
            />
            <AppRoutes role={currentUser.role} />
          </UserContext.Provider>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}