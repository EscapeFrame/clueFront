/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {
  NavbarWrapper, Container, Brand, LogoImg,
  NavbarNav, NavLinks, NavItem, DropdownContainer,
  DropdownItem, DropdownMenu, DropdownButton,
  ProfileInfoBox, ProfileImage, ProfileName, ProfileStudentNumber
} from '@/widgets/Navbar/styles';

import { AiFillSetting, AiFillQuestionCircle } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

export default function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const studentNumber = 2201;
  const name = "공덕현";
  const myImage = "/sample.jpg";

  return (
    <NavbarWrapper>
      <Container>
        <Brand href="/">
          <LogoImg src="/clue.svg" alt="로고" />
        </Brand>
        <NavbarNav>
          <NavLinks>
            <li><NavItem href="/class">학습실로 가기</NavItem></li>
            <li><NavItem href="#action1">수강신청</NavItem></li>
            <li><NavItem href="#action2">서비스 소개</NavItem></li>
          </NavLinks>
          <DropdownContainer>
            <DropdownButton onClick={toggleDropdown}><IoPerson /></DropdownButton>
            {dropdownVisible && (
              <DropdownMenu>
                    <ProfileInfoBox>
                        <ProfileImage src={myImage} alt="프로필" />
                        <ProfileName>{name}</ProfileName>
                        <ProfileStudentNumber>{studentNumber}</ProfileStudentNumber>
                    </ProfileInfoBox>
                    
                    <DropdownItem href="#setting"><AiFillSetting />&nbsp;설정</DropdownItem>
                    <DropdownItem href="#Q&A"><AiFillQuestionCircle />&nbsp;문의하기</DropdownItem>
                    <DropdownItem href="#logout"><MdOutlineLogout />&nbsp;로그아웃</DropdownItem>
                </DropdownMenu>            
            )}
          </DropdownContainer>
        </NavbarNav>
      </Container>
    </NavbarWrapper>
  );
}