/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myImage from '../../../public/sample.png';
import * as s from './styles';
import { GoBug } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useRecoilState } from 'recoil';
import { UserContext } from '@/entities/Context/LoginContext';
import { userState } from '@/shared/model/userState';
import Customapi from '@/shared/config/api'; // Add this line
// Customapi is not required here because profile image is provided by useProfileImage
import { useProfileImage } from '@/shared/model/profileImageState';
import { useAuth } from '@/app/hooks/useAccessToken'; // Import useAuth hook


interface DropdownProps {
  studentNumber?: number | string;
  name: string;
  myImage?: string;
  role: string | null;
}

export default function Dropdown({ role, name, studentNumber, myImage: userProfileImage }: DropdownProps) {
  const { user } = useAuth(); // Get user from useAuth hook
  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const context = useContext(UserContext);
  const [profileImageUrl] = useProfileImage();



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

  const handleLogout = async () => {
    await Customapi.post("/api/logout");
    localStorage.removeItem("accessToken");
    removeAuthInfo();
    setUser({
      username: '',
      userId: '',
      email: '',
      role: '',
      grade: 0,
      classNo: 0,
      number: 0,
      description: '',
      myImage: null,
    });
    navigate('/login');
    setIsModalOpen(false);
  };

  if (!role) {
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
        <GoBug onClick={question} />
      </s.Icon>
      <s.User>
        <s.UserInfo>
          <s.ProfileImage src={profileImageUrl || userProfileImage || myImage} alt="프로필" />
          <s.ProfileName>{name}</s.ProfileName>
          {user.role !== 'TEACHER' && (
            <>
              {studentNumber && <s.StudentNumber>{studentNumber}</s.StudentNumber>}
            </>
          )}
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
              <s.ModalButtonDanger onClick={handleLogout}>확인</s.ModalButtonDanger>
              <s.ModalButton onClick={() => setIsModalOpen(false)}>취소</s.ModalButton>
            </s.ModalButtonContainer>
          </s.ModalContent>
        </s.Modal>
      )}
    </s.DropdownContainer>
  );
}