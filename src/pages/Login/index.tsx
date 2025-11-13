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
        if (token) {
            console.log("로그인 페이지: 이미 인증된 사용자입니다. 홈페이지로 리디렉션합니다.");
            navigate('/', { replace: true });
        } else {
            console.log("로그인 페이지: 인증되지 않은 사용자입니다. 로그인 페이지에 머무릅니다.");
        }
    }, [token, navigate]);

    useEffect(() => {
        console.log("로그인 페이지: URL 파라미터 확인을 시작합니다.");
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');

        console.log("URL에서 가져온 Access Token:", accessToken);

        if (accessToken) {
            console.log("URL에서 Access Token을 발견했습니다.");
            if (context) {
                console.log("`setAuthInfo`를 호출하고 홈페이지로 리디렉션합니다.");
                context.setAuthInfo(accessToken);
                navigate('/', { replace: true });
            } else {
                console.error("로그인 컴포넌트에서 UserContext를 사용할 수 없습니다.");
            }
        } else {
            console.log("URL 파라미터에 Access Token이 없습니다.");
        }
    }, [context, navigate]);
    
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