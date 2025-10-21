/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as s from './styles';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

interface DropdownProps {
  studentNumber: number;
  name: string;
  myImage: string;
  role: string | null;
}

export default function Dropdown({ role, name, myImage }: DropdownProps) {

  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  }

  const setting = () => {
    navigate("/setting");
  }

  const question = () => {
    alert("문의 구글 폼으로 이동.");
  }

  if (role === null) {
    return (
      <s.DropdownContainer>
        <s.DropdownButton onClick={() => { navigate("/login") }}>로그인하기</s.DropdownButton>
      </s.DropdownContainer>
    );
  }

  return (
    <s.DropdownContainer>
      <s.Icon>
        <IoSettingsOutline onClick={setting} />
        <AiOutlineQuestionCircle onClick={question}/>
      </s.Icon>
      <s.User>
        <s.UserInfo>
          <s.ProfileImage src={myImage} alt="프로필" />
          <s.ProfileName>{name}</s.ProfileName>
        </s.UserInfo>
        <MdOutlineLogout onClick={logout} />
      </s.User>
    </s.DropdownContainer>
  );
}