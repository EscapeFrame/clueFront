import { useSetRecoilState } from 'recoil';
import { userState } from '@/shared/model/userState';
import { useContext } from 'react';
import { UserContext } from '@/entities/Context/LoginContext';
import * as s from './Button.styles';
import googleLogo from '../../../public/google.png';
import Customapi from '@/shared/config/api';

function LoginButton() {

  const setUser = useSetRecoilState(userState);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("LoginButton은 UserContext.Provider 안에서 사용되어야 합니다.");
  }
  const { setAuthInfo, removeAuthInfo, accessToken } = context;

const onGoogleLogin = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  const onLogout = async () => {
    try {
      await Customapi.post("/logout");
    } catch (err) {
      console.error("로그아웃 중 오류:", err);
    } finally {
      localStorage.removeItem("accessToken");
      removeAuthInfo();
      setUser({
        username: '',
        userId: '',
        role: '',
        classCode: 0,
      });
      window.location.href = "/";
    }
  };

  return (
    <s.Container>
      {!accessToken ? (
        <s.LoginButtonStyled onClick={onGoogleLogin}>
          <img src={googleLogo} alt="google logo" />
          Google 로그인
        </s.LoginButtonStyled>
      ) : (
        <s.LogoutButtonStyled onClick={onLogout}>
          로그아웃
        </s.LogoutButtonStyled>
      )}
    </s.Container>
  );
}

export default LoginButton;
