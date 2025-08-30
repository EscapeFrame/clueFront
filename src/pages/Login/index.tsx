import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'

export function Login() {

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

export default Login()