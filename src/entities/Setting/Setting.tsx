// UserSetting.tsx
import { GoUser } from "./Link";
import { Profile } from "./Profile";
import { SetData } from "./UserData";
import * as S from './styles';

export function UserSetting() {
    return (
        <S.Wrapper>
            <Profile />

            <S.SectionTitle>기본정보</S.SectionTitle>
            <S.SubTitle>학습실의 기본정보를 설정합니다.</S.SubTitle>
            <GoUser title="사용자 정보 수정" body="이름, 학번 등을 수정할 수 있습니다." url="/setting/user" />
            <GoUser title="보관된 채팅" body="채팅을 보관, 삭제 하실 수 있습니다." url="/setting/chat" />

            <S.Divider />

            <S.SectionTitle>알림 설정</S.SectionTitle>
            <S.SubTitle>각 제공되는 기능의 알림을 설정합니다.</S.SubTitle>
            <SetData title="사용자와의 채팅" body="다른 사용자와의 채팅이 오는 것을 알려줍니다." />
            <SetData title="채점결과" body="과제나 시험 등의 채점 결과가 등록되었을 때 알려줍니다." />
            <SetData title="미제출 과제" body="제출일까지 24시간 이내로 제출하지 않은 과제가 있으면 알림을 보냅니다." />
            <SetData title="수업 내용 업로드" body="선생님께서 수업 자료나 내용을 새로 업로드했을 때 알려줍니다." />
            <SetData title="수행평가" body="선생님께서 수행평가를 새로 올렸을 때 알려줍니다." />
            <SetData title="학교 공지" body="학교에서 발송한 공식 공지를 알려줍니다." />
            <SetData title="서비스 공지" body="서비스 이용에 관련된 공지사항을 전달합니다." />

            <S.ConfirmButton>확인</S.ConfirmButton>
        </S.Wrapper>
    );
}
