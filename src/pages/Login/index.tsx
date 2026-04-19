import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'
import { useEffect } from "react";
import Image from '@/assets/images/registerImg.webp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/app/hooks/useAccessToken";

export function Login() {
    const { setAuthInfo, user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('access_token');

        if (!urlToken) {
            console.log("로그인 페이지: 인증 토큰이 없습니다. 로그인 페이지에 머무릅니다.");
            return;
        }

        console.log("로그인 페이지: URL에서 Access Token을 발견했습니다. 인증 정보를 설정합니다. 사용자 정보 로딩 완료 시 메인으로 이동합니다.");
        setAuthInfo(urlToken);

        const start = Date.now();
        let timeoutId: number | null = null;

        const checkAndNav = () => {
            if ((user && user.userId) || !loading) {
                navigate('/', { replace: true });
                return;
            }
            if (Date.now() - start > 3000) {
                navigate('/', { replace: true });
                return;
            }
            timeoutId = window.setTimeout(checkAndNav, 200) as unknown as number;
        };
        checkAndNav();

        return () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        };
    }, [setAuthInfo, navigate, user, loading]);


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
