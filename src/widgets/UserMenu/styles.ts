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