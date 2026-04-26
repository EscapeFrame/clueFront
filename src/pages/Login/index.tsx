import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'
import { useEffect, useRef } from "react";
import Image from '@/assets/images/registerImg.webp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/app/hooks/useAccessToken";

export function Login() {
    const { setAuthInfo } = useAuth();
    const navigate = useNavigate();
    const handledRef = useRef(false);

    useEffect(() => {
        if (handledRef.current) return;
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('access_token');

        if (!urlToken) {
            console.log("로그인 페이지: 인증 토큰이 없습니다. 로그인 페이지에 머무릅니다.");
            return;
        }

        handledRef.current = true;
        console.log("로그인 페이지: URL에서 Access Token을 발견했습니다.");
        setAuthInfo(urlToken);

        const start = Date.now();
        let timeoutId: number;
        const checkAndNav = () => {
            if (localStorage.getItem('accessToken') || Date.now() - start > 3000) {
                navigate('/', { replace: true });
                return;
            }
            timeoutId = window.setTimeout(checkAndNav, 200);
        };
        checkAndNav();

        return () => clearTimeout(timeoutId);
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
