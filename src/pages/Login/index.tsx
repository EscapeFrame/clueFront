import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'
import { useEffect, useContext } from "react";
import Image from '@/../public/registerImg.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "@/entities/Context/LoginContext";

export function Login() {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      const handleLogin = async (token: string) => {
        if (context) {
          console.log("Context exists. Calling setAuthInfo...");
          await context.setAuthInfo(token); // await로 호출하여 사용자 정보 로딩을 기다림
          console.log("setAuthInfo finished. Redirecting to /");
          navigate('/', { replace: true });
        } else {
          console.error("UserContext is not available in Login component.");
        }
      };

        console.log("Login page useEffect triggered.");
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');

        console.log("Access Token from URL:", accessToken);

        if (accessToken) {
            handleLogin(accessToken);
        } else {
            console.log("Tokens not found in URL params.");
        }
    }, [context, navigate]); // 의존성 배열 추가로 최초 1회만 실행되도록 함
    
    return (
        <S.Container>
            <S.Left>
                <S.Tittle>Welcome to CLUE service</S.Tittle>
                <S.Eclpise />
                <S.Image src={Image} alt="Signup Illustration" width={400} height={300} />
            </S.Left>
            <S.Right>
                <LoginButton />
            </S.Right>
        </S.Container>
    )
}


export default Login