import LoginButton from "@/entities/Login/LoginButton"
import * as S from './styles'

export function Login() {

    return (
        <S.Container>
            <img src="clue.svg" alt="logo"/>
            <LoginButton />
        </S.Container>
    )
}

export default Login()