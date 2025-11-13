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
        console.log("Login page useEffect triggered.");
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');

        console.log("Access Token from URL:", accessToken);

        if (accessToken) {
            console.log("Tokens found in URL.");
            if (context) {

                console.log("setAuthInfo called. Redirecting to /");
                context.setAuthInfo(accessToken);
                navigate('/', { replace: true });
            } else {
                console.error("UserContext is not available in Login component.");
            }
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