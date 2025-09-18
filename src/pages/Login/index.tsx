import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'
import { useEffect, useContext } from "react";
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
            <S.LogoBox>
                <img src="clue.svg" alt="logo" />
            </S.LogoBox>
            <S.LoginScript>하나로 끝나는 스마트 교육, <br />
                클라우드 기반 교육 지원 플랫폼
            </S.LoginScript>
            
            <LoginButton />
            <S.AgreementScript>
                로그인하면 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다.
            </S.AgreementScript>
        </S.Container>
    )
}

export default Login