import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { colors } from '@/shared/theme/theme.styles';

export const Container = styled.div`
`;

export const Title = styled.h2`
  ${fonts.P4};
  font-weight: 600;
  color: ${colors.black};
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 120px;
`;

export const SearchGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 250px;
`;

export const FilterLabel = styled.label`
  ${fonts.P3};
  font-weight: 500;
  color: ${colors.black};
`;

export const Select = styled.select`
  ${fonts.P3};
  padding: 0.5rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 0.25rem;
  background-color: ${colors.white};
  cursor: pointer;
  
  &:focus {
    outline: 2px solid ${colors.primary};
    border-color: ${colors.primary};
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  ${fonts.P3};
  padding: 0.5rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 0.25rem;
  width: 100%;
  
  &:focus {
    outline: 1px solid ${colors.primary};
    border-color: ${colors.primary};
  }
  
  &::placeholder {
    color: ${colors.gray[4]};
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  color: ${colors.gray[4]};
  pointer-events: none;
`;

export const StudentList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 항상 2개 열
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr); // 데스크탑/태블릿에서도 2개
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; // 모바일에서 1개
  }
`;

export const StudentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid ${colors.gray[2]};
  border-radius: 0.75rem;
  padding: 1rem;
  background-color: ${colors.gray[1]};
  box-shadow: 0 1px 0 rgba(0,0,0,0.03);
  transition: box-shadow 120ms ease, transform 120ms ease;
  width: 100%; // 그리드에서 균등하게

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }

  &:hover {
    box-shadow: 0 6px 18px rgba(33,33,33,0.06);
    transform: translateY(-2px);
  }
`;

export const EmptyMessage = styled.p`
  ${fonts.P2};
  color: ${colors.red[3]};
`;

export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
`;

export const SubmitDate = styled.span`
  color: ${colors.gray[4]};
  ${fonts.P2};
`;

// export const UserAvatar = styled.div<{ imgUrl?: string | null }>`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   flex-shrink: 0;
//   border: 1px solid ${theme.colors.gray[400]};
//   background-color: ${({ imgUrl }) => (imgUrl ? 'transparent' : colors.gray[2])};
//   background-image: ${({ imgUrl }) => (imgUrl ? `url(${imgUrl})` : 'none')};
//   background-size: cover;
//   background-position: center;

//   @media (max-width: 600px) {
//     margin-bottom: 0.5rem;
//   }
// `;
interface UserAvatarProps {
  imgUrl?: string | null;
  large?: boolean;
}

export const UserAvatar = styled.img<UserAvatarProps>`
  width: ${({ large }) => (large ? '80px' : '48px')};
  height: ${({ large }) => (large ? '80px' : '48px')};
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  background: ${colors.gray[2]};
`;

export const UserName = styled.span`
  color: ${colors.black};
  ${fonts.P3};
  font-weight: 600;
`;

export const UserNumber = styled.span`
  color: ${colors.gray[4]};
  ${fonts.P2};
`;

export const StatusBadge = styled.div<{ isSubmitted: boolean }>`
  padding: 4px 8px;
  color: ${({ isSubmitted }) => isSubmitted ? colors.primary : colors.black};
  border-radius: 4px;
  ${fonts.P3};

  @media (max-width: 600px) {
    margin-top: 0.5rem;
  }
  margin-left: 12px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  margin-top: 20px;
  height: 25rem;
  ul { margin: 0; padding: 0;}
`;

export const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.gray[3]};
  border-radius: 0.5rem;
  background-color: ${colors.white};
  margin-bottom: 0.5rem;

  .fileInfo {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  a {
    color: ${colors.black};
    text-decoration: none;
    font-weight: 500;
  }

  span {
    ${fonts.P1}
    color: ${colors.gray[4]};
  }

  button {
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.gray[3]};
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
}
`;

export const FileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  span {
    font-weight: 500;
  }

  button {
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.gray[3]};
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
  }
`;

export const EmptyStateMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background-color: ${colors.gray[1]};
  border-radius: 0.5rem;
  color: ${colors.gray[4]};
  ${fonts.P3};
  text-align: center;
`;
