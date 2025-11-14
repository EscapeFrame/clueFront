import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'
import { useEffect } from "react";
import Image from '@/../public/registerImg.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/app/hooks/useAccessToken";

export function Login() {
    const { setAuthInfo } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('access_token');

        if (urlToken) {
            // Case 1: Token is in the URL (coming from OAuth).
            console.log("로그인 페이지: URL에서 Access Token을 발견했습니다. 인증 정보를 설정하고 홈페이지로 리디렉션합니다.");
            setAuthInfo(urlToken);
            navigate('/', { replace: true });
        } else {
            // Case 2: No token in URL. Stay on login page.
            console.log("로그인 페이지: 인증 토큰이 없습니다. 로그인 페이지에 머무릅니다.");
        }
    }, [setAuthInfo, navigate]);
    
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