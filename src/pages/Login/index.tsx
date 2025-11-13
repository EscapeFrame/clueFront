import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'
import { useEffect, useContext } from "react";
import Image from '@/../public/registerImg.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "@/entities/Context/LoginContext";
import { useAuth } from "@/app/hooks/useAccessToken";

export function Login() {
    const { accessToken: token } = useAuth();
    const context = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('access_token');

        if (urlToken) {
            // Case 1: Token is in the URL (coming from OAuth). This is the highest priority.
            console.log("로그인 페이지: URL에서 Access Token을 발견했습니다. 인증 정보를 설정하고 홈페이지로 리디렉션합니다.");
            if (context) {
                context.setAuthInfo(urlToken);
                navigate('/', { replace: true });
            } else {
                console.error("로그인 컴포넌트에서 UserContext를 사용할 수 없습니다.");
            }
        } else if (token) {
            // Case 2: No token in URL, but a token exists in storage.
            console.log("로그인 페이지: 이미 저장된 토큰으로 인증되었습니다. 홈페이지로 리디렉션합니다.");
            navigate('/', { replace: true });
        } else {
            // Case 3: No token anywhere.
            console.log("로그인 페이지: 인증 토큰이 없습니다. 로그인 페이지에 머무릅니다.");
        }
    }, [token, context, navigate]);
    
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