import { useSetRecoilState } from 'recoil';
import { userState } from '@/shared/recoil/user';
import { useContext } from 'react';
import { UserContext } from '@/entities/Context/LoginContext';
import axios from 'axios';
import { Container, LoginButtonStyled, LogoutButtonStyled } from './Button.styles';

function LoginButton() {
  const setUser = useSetRecoilState(userState);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("LoginButton은 UserContext.Provider 안에서 사용되어야 합니다.");
  }
  const { setAccessToken, accessToken } = context;

  const onGoogleLogin = () => {
    const redirectUri = encodeURIComponent(
      "http://10.129.57.64:8080/login/oauth2/code/google"
    );
    window.location.href = `http://10.129.57.64:8080/oauth2/authorization/google?prompt=login&redirect_uri=${redirectUri}`;
  };

  const onLogout = async () => {
    try {
      const res = await axios.post(
        "http://10.129.57.64:8080/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        }
      );
      if (res.status === 200) {
        localStorage.removeItem("accessToken");
        setAccessToken(null);
        setUser({
          name: '',
          email: '',
          picture: '',
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
