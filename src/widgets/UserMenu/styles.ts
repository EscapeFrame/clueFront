import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';

export const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${fonts.P3}
  color: ${theme.colors.black};
  padding: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.4rem;
    ${fonts.P2};
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 16px;
  font-size: 1.25rem;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%
`;

export const ProfileName = styled.div`
  ${fonts.P2}
  font-weight: 600;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #EBF6FF;
  border-radius: 24px;
  padding: 6px 12px;
  item-align: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  item-align: center;
  color: #0077FF;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 320px;
`;

export const ModalText = styled.p`
  ${fonts.P2}
  margin: 0 0 1.5rem;
  color: ${theme.colors.black};
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ModalButton = styled.button`
  ${fonts.P2}
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[300]};
  background-color: ${theme.colors.white};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;