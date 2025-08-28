import { userState } from "@/shared/model/userState"
import { useRecoilValue } from "recoil"
import * as S from './styles';

const getUserInformation = useRecoilValue(userState);
// 유저 반 정보 나중에 가져오기

export function Profile() {
    const image = getUserInformation.picture
    console.log(image);

    const name = "공덕현"
    const grad = 2;
    const classNumber = 2;
    const studentNumber = 1;
    return (
        <S.Container>
            <div>
                <img src = {image} alt="User's image"></img>
                <div>
                    <span>{name}</span>
                    <p>부산소프트웨어마이스터고등학교</p>
                    <p>{grad}학년 {classNumber}반 {studentNumber}번</p>
                </div>
            </div>
        </S.Container>
    )
}