/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './styles';
import { AiFillSetting, AiFillQuestionCircle } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

interface DropdownProps {
  studentNumber: number;
  name: string;
  myImage: string;
  role: string | null;
}

export default function Dropdown({ role, studentNumber, name, myImage }: DropdownProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const navigate = useNavigate();

  if (role === null) {
    return (
      <s.DropdownContainer>
        <s.DropdownButton onClick={() => { navigate("/login") }}>로그인하기</s.DropdownButton>
      </s.DropdownContainer>
    );
  }

  return (
    <s.DropdownContainer>
      <s.DropdownButton onClick={toggleDropdown}><IoPerson /></s.DropdownButton>
      {dropdownVisible && (
        <s.DropdownMenu>
          <s.ProfileInfoBox>
            <s.ProfileImage src={myImage} alt="프로필" />
            <s.ProfileName>{name}</s.ProfileName>
            <s.ProfileStudentNumber>{studentNumber}</s.ProfileStudentNumber>
          </s.ProfileInfoBox>

          <s.DropdownItem href="/setting"><AiFillSetting />&nbsp;설정</s.DropdownItem>
          <s.DropdownItem href="#Q&A"><AiFillQuestionCircle />&nbsp;문의하기</s.DropdownItem>
          <s.DropdownItem href="#logout"><MdOutlineLogout />&nbsp;로그아웃</s.DropdownItem>
        </s.DropdownMenu>
      )}
    </s.DropdownContainer>
  );
}