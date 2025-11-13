/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './styles';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useRecoilState } from 'recoil';
import { UserContext } from '@/entities/Context/LoginContext';
import { userState } from '@/shared/model/userState';

interface DropdownProps {
  studentNumber: number;
  name: string;
  myImage: string;
  role: string | null;
}

export default function Dropdown({ role, name, myImage }: DropdownProps) {

  const navigate = useNavigate();
  const [_, setUser] = useRecoilState(userState);
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
      role: '',
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
      <s.Icon>{isModalOpen && (
          <s.Modal>
            <s.ModalContent>
              <s.ModalText>로그아웃 하시겠습니까?</s.ModalText>
              <s.ModalButtonContainer>
                <s.ModalButton onClick={handleLogout}>확인</s.ModalButton>
                <s.ModalButton onClick={() => setIsModalOpen(false)}>취소</s.ModalButton>
              </s.ModalButtonContainer>
            </s.ModalContent>
          </s.Modal>
        )}

<IoSettingsOutline onClick={setting} />
        <AiOutlineQuestionCircle onClick={question} /></s.Icon>
      <s.User>
        <s.UserInfo>
          <s.ProfileImage src={myImage} alt="프로필" />
          <s.ProfileName>{name}</s.ProfileName>
        </s.UserInfo>
        <MdOutlineLogout onClick={() => setIsModalOpen(true)} />
      </s.User>
    </s.DropdownContainer>
  );
}