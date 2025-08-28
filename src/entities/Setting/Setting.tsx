import { Profile } from "./Profile"
import { SetData } from "./UserData"   // 대문자 시작

export function UserSetting() {
    return (
        <div>
            <Profile />
            <SetData title="안녕하세요" body="안녕하세요" url="하이" />
        </div>
    )
}
