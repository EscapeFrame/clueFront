import { useSetRecoilState } from 'recoil';
import { userState } from '@/shared/model/userState';
import { useContext } from 'react';
import { UserContext } from '@/entities/Context/LoginContext';
import { Container, LoginButtonStyled, LogoutButtonStyled } from './Button.styles';
import Customapi from '@/shared/config/api';

function LoginButton() {

  const setUser = useSetRecoilState(userState);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("LoginButton은 UserContext.Provider 안에서 사용되어야 합니다.");
  }
  const { setAuthInfo, removeAuthInfo, accessToken, user } = context;

  const onGoogleLogin = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/login/oauth2/code/google`
    );
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${API_URL}/oauth2/authorization/google?prompt=login&redirect_uri=${redirectUri}`;
  };

  const onLogout = async () => {
    try {
      const res = await Customapi.post("/logout");
      if (res.status === 200) {
        localStorage.removeItem("accessToken");
        removeAuthInfo();
        setUser({
          username: '',
          userId: '',
          role: '',
        });
        window.location.href = "/";
      }
    } catch (err) {
      console.error("로그아웃 중 오류:", err);
    }
  };

  return (
    <Container>
      {!accessToken ? (
        <LoginButtonStyled onClick={onGoogleLogin}>
          Google 로그인
        </LoginButtonStyled>
      ) : (
        <LogoutButtonStyled onClick={onLogout}>
          로그아웃
        </LogoutButtonStyled>
      )}
    </Container>
  );
}

export default LoginButton;
