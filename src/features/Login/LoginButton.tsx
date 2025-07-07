import { useSetRecoilState } from 'recoil';
import { userState } from '@/shared/recoil/user';
import { useContext } from 'react';
import { UserContext } from '@/entities/Context/LoginContext';
import styles from '@/shared/css/Login/LoginButton.module.css';
import axios from 'axios';

function LoginButton() {
  const setUser = useSetRecoilState(userState);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("LoginButton은 UserContext.Provider 안에서 사용되어야 합니다.");
  }
  const { setAccessToken, accessToken } = context;

  const onGoogleLogin = () => {
    const redirectUri = encodeURIComponent(
      "http://localhost:3000/login/oauth2/code/google"
    );
    window.location.href = `http://localhost:10.150.3.224/oauth2/authorization/google?prompt=login&redirect_uri=${redirectUri}`;
  };

  const onLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/logout",
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
    <div className={styles.container}>
      {!accessToken ? (
        <button onClick={onGoogleLogin} className={styles.loginButton}>
          Google 로그인
        </button>
      ) : (
        <button onClick={onLogout} className={styles.logoutButton}>
          로그아웃
        </button>
      )}
    </div>
  );
}

export default LoginButton;
