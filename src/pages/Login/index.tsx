import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'
import { useEffect, useContext } from "react";
import Image from '@/../public/registerImg.png';
import { UserContext } from "@/entities/Context/LoginContext";

export function Login() {
    const context = useContext(UserContext);

    useEffect(() => {
        console.log("Login page useEffect triggered.");
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        console.log("Access Token from URL:", accessToken);
        console.log("Refresh Token from URL:", refreshToken);

        if (accessToken && refreshToken) {
            console.log("Tokens found in URL.");
            if (context) {
                console.log("Context exists. Calling setAuthInfo...");
                context.setAuthInfo(accessToken, refreshToken);
                console.log("setAuthInfo called. Redirecting to /");
                // 토큰 저장 후, 메인 페이지로 이동하며 새로고침
                window.location.href = '/';
            } else {
                console.error("UserContext is not available in Login component.");
            }
        } else {
            console.log("Tokens not found in URL params.");
        }
    });

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