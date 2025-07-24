import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';

export const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${fonts.P3}
  color: ${theme.colors.black};
  padding: 0.5rem; // 터치 영역 보장하게끔..?
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[500]};
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem ${theme.colors.gray[200]};

  width: clamp(200px, 25vw, 320px);
  display: flex;
  flex-direction: column;
  z-index: 999;
  overflow: hidden;
`;

export const ProfileInfoBox = styled.div`
  padding: 16px;
  text-align: center;
  background-color: ${theme.colors.gray[100]};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

export const ProfileName = styled.div`
  ${fonts.P2}
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const ProfileStudentNumber = styled.div`
  ${fonts.P1}
  color: ${theme.colors.gray[600]};
`;

export const DropdownItem = styled.a`
  text-decoration: none;
  color: ${theme.colors.black};
  padding: 0.75rem 1rem;
  ${fonts.P2}
  display: flex;
  align-items: center;
  gap: 0.5rem;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.blue[600]};
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.75rem;
    ${fonts.P2}
  }
`;