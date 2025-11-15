import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/shared/model/userState";
import * as s from "./styles";
import Button from "@/entities/UI/Button";
import { IoCameraOutline } from "react-icons/io5";

export const UserSection: React.FC = () => {
    const user = useRecoilValue(userState);

    const [name, setName] = useState(user?.username || "");
    const [email] = useState<string>("");
    const [grade, setGrade] = useState<number>();
    const [classNumber, setClassNumber] = useState<number>();
    const [number, setNumber] = useState<number>();
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;
        // classCode may be 0 -> should be treated as default 1101
        if (user.classCode !== undefined && user.classCode !== null) {
            let code = typeof user.classCode === 'string' ? parseInt(user.classCode, 10) : user.classCode;
            if (isNaN(code)) return;
            if (code === 0) {
                code = 1101;
            }
            setGrade(Math.floor(code / 1000));
            setClassNumber(Math.floor((code % 1000) / 100));
            setNumber(code % 100);
        }
    }, [user]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, grade, classNumber, number, description, image });
    };

    // 백엔드에서 못 불러오면 받아온 사용자 반까지 표시
    const gradeOptions: number[] = Array.from({ length: 3 }, (_, i) => i + 1);
    const classOptions: number[] = Array.from({ length: 4 }, (_, i) => i + 1);

    return (
        <s.Section>
            <s.Wrapper>
                <s.SectionTitle>사용자 정보 수정</s.SectionTitle>
                <s.SectionExplan>프로필 정보를 업데이트하고 관리하세요.</s.SectionExplan>
            </s.Wrapper>

            <s.AvatarArea>
                {image ? <s.Avatar src={image} alt="User avatar" /> : <s.AvatarFallback />}
                <s.AvatarRight>
                    <label>
                        <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                        <s.FileButton><IoCameraOutline />&nbsp; 사진변경</s.FileButton>
                    </label>
                    <s.SubText>SVG, JPG, JPEG, PNG 파일만 업로드 가능합니다.</s.SubText>
                </s.AvatarRight>
            </s.AvatarArea>

            <s.Line />

            <s.FormArea onSubmit={handleSubmit}>
                <s.FormRow>
                    <s.FormGroup>
                        <label>이름<span>*</span></label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름"
                        />
                    </s.FormGroup>

                    <s.FormGroup>
                        <label>이메일<span>*</span></label>
                        <input type="email" value={email} disabled />
                    </s.FormGroup>
                </s.FormRow>

                <s.FormRow>
                    <s.FormGroup>
                        <label>학년<span>*</span></label>
                        <s.RadioWrapper>
                            {gradeOptions.map((g: number) => (
                                <label key={g}>
                                    <input
                                        type="radio"
                                        name="grade"
                                        value={g}
                                        checked={grade === g}
                                        disabled
                                    />
                                    {g}학년
                                </label>
                            ))}
                        </s.RadioWrapper>
                    </s.FormGroup>

                    <s.FormGroup>
                        <label>반<span>*</span></label>
                        <s.RadioWrapper>
                            {classOptions.map((c: number) => (
                                <label key={c}>
                                    <input
                                        type="radio"
                                        name="class"
                                        value={c}
                                        checked={classNumber === c}
                                        disabled
                                    />
                                    {c}반
                                </label>
                            ))}
                        </s.RadioWrapper>
                    </s.FormGroup>
                </s.FormRow>

                <s.FormGroup>
                    <label>번호<span>*</span></label>
                    <input type="number" value={number || ''} disabled />
                </s.FormGroup>

                <s.FormGroup>
                    <label>소개</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="내용을 입력해주세요."
                    />
                </s.FormGroup>
            </s.FormArea>

            <s.ButtonWrapper>
                <Button text={"저장"} width={'100px'} type={0} onClick={handleSubmit} />
            </s.ButtonWrapper>
        </s.Section>
    );
};
