import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/shared/model/userState";
import * as S from "./styles";

export default function UserInfo() {
  const user = useRecoilValue(userState);

  const [name, setName] = useState(user?.username || "");
  const [grade, setGrade] = useState(2);
  const [classNumber, setClassNumber] = useState(2);
  const [studentNumber, setStudentNumber] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCancel = () => {
    setName(user?.username || "");
    setGrade(2);
    setClassNumber(2);
    setStudentNumber(1);
    setDescription("");
    setImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, grade, classNumber, studentNumber, description, image });
    // TODO: update user info API
  };

  return (
    <S.Container>
      <S.ProfileSection>
        <S.AvatarArea>
          {image ? <S.Avatar src={image} alt="User avatar" /> : <S.AvatarFallback />}
          <label>
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            <S.FileButton>파일선택</S.FileButton>
          </label>
          <S.SubText>프로필 이미지와 닉네임을 선택</S.SubText>
        </S.AvatarArea>

        <S.FormArea onSubmit={handleSubmit}>
          <S.FormGroup>
            <label>이름*</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
          </S.FormGroup>

          <S.FormRow>
            <S.FormGroup>
              <label>학년*</label>
              <input type="number" value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
            </S.FormGroup>
            <S.FormGroup>
              <label>반*</label>
              <input type="number" value={classNumber} onChange={(e) => setClassNumber(Number(e.target.value))} />
            </S.FormGroup>
          </S.FormRow>

          <S.FormGroup>
            <label>번호*</label>
            <input type="number" value={studentNumber} onChange={(e) => setStudentNumber(Number(e.target.value))} />
          </S.FormGroup>

          <S.FormGroup>
            <label>설명</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="내용을 입력해주세요." />
          </S.FormGroup>

          <S.SubmitRow>
            <button type="button" onClick={handleCancel}>취소</button>
            <button type="submit">수정</button>
          </S.SubmitRow>
        </S.FormArea>
      </S.ProfileSection>

      <S.ChatSection>
        <h3>보관된 채팅</h3>
        <ul>
          {["유근찬", "김민재", "이도"].map((name) => (
            <li key={name}>
              {name} <a href="#">보러가기 &gt;</a>
            </li>
          ))}
        </ul>
      </S.ChatSection>
    </S.Container>
  );
}
