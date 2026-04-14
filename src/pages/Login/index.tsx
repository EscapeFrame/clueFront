import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'
import { useEffect, useRef } from "react";
import Image from '@/assets/images/registerImg.webp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/app/hooks/useAccessToken";

export function Login() {
    const { setAuthInfo, user, loading } = useAuth();
    const navigate = useNavigate();
    const navigateTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('access_token');

        if (urlToken) {
            // Case 1: Token is in the URL (coming from OAuth).
            console.log("로그인 페이지: URL에서 Access Token을 발견했습니다. 인증 정보를 설정합니다. 사용자 정보 로딩 완료 시 메인으로 이동합니다.");
            setAuthInfo(urlToken);
            // Wait for user info to be loaded in useAuth, but add a safety timeout
            const start = Date.now();
            const checkAndNav = () => {
                // if user data is present or loading finished, navigate
                if ((user && user.userId) || !loading) {
                    navigate('/', { replace: true });
                    return;
                }
                // safety: timeout after 3s
                if (Date.now() - start > 3000) {
                    navigate('/', { replace: true });
                    return;
                }
                // otherwise recheck shortly
                navigateTimeoutRef.current = window.setTimeout(checkAndNav, 200) as unknown as number;
            };
            checkAndNav();
        } else {
            // Case 2: No token in URL. Stay on login page.
            console.log("로그인 페이지: 인증 토큰이 없습니다. 로그인 페이지에 머무릅니다.");
        }
    }, [setAuthInfo, navigate, user, loading]);

    useEffect(() => {
        return () => {
            if (navigateTimeoutRef.current) {
                clearTimeout(navigateTimeoutRef.current);
            }
        };
    }, []);
    
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
