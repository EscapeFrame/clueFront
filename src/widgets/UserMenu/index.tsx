/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myImage from '../../../public/sample.png';
import * as s from './styles';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useRecoilState } from 'recoil';
import { UserContext } from '@/entities/Context/LoginContext';
import { userState } from '@/shared/model/userState';

interface DropdownProps {
  studentNumber?: number | string;
  name: string;
  myImage?: string;
  role: string | null;
}

export default function Dropdown({ role, name, studentNumber, myImage: userProfileImage }: DropdownProps) {

  const navigate = useNavigate();
  const [User, setUser] = useRecoilState(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Dropdown은 UserContext.Provider 안에서 사용되어야 합니다.");
  }
  const { removeAuthInfo } = context;

  const setting = () => {
    navigate("/setting");
  }

  const question = () => {
    window.location.href = "https://forms.gle/bbRKdV8WNegv3QSU9";
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    removeAuthInfo();
    setUser({
      username: '',
      userId: '',
      email: '',
      role: '',
      classCode: 0,
      grade: 0,
      classNo: 0,
      number: 0,
      description: '',
      myImage: null,
    });
    navigate('/login');
    setIsModalOpen(false);
  };

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
        <AiOutlineQuestionCircle onClick={question} />
      </s.Icon>
      <s.User role={role}>
        <s.UserInfo>
          <s.ProfileImage src={userProfileImage || myImage} alt="프로필" />
          <s.ProfileName>{name}</s.ProfileName>
          {studentNumber && <s.StudentNumber>{studentNumber}</s.StudentNumber>}
        </s.UserInfo>
        <s.pointer onClick={() => setIsModalOpen(true)}>
          <MdOutlineLogout />
        </s.pointer>
      </s.User>

      {/* 로그아웃 확인 모달 */}
      {isModalOpen && (
        <s.Modal onClick={() => setIsModalOpen(false)}>
          <s.ModalContent onClick={(e) => e.stopPropagation()}>
            <s.ModalText>로그아웃 하시겠습니까?</s.ModalText>
            <s.ModalButtonContainer>
              <s.ModalButton onClick={handleLogout}>확인</s.ModalButton>
              <s.ModalButton onClick={() => setIsModalOpen(false)}>취소</s.ModalButton>
            </s.ModalButtonContainer>
          </s.ModalContent>
        </s.Modal>
      )}
    </s.DropdownContainer>
  );
}