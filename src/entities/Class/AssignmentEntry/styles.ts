import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';

export const Container = styled.div`
  background-color: ${theme.colors.white};
`;

export const Title = styled.h2`
  ${fonts.P4};
  font-weight: 600;
  color: ${theme.colors.black};
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
  color: ${theme.colors.black};
`;

export const Select = styled.select`
  ${fonts.P3};
  padding: 0.5rem;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 0.25rem;
  background-color: ${theme.colors.white};
  cursor: pointer;
  
  &:focus {
    outline: 2px solid ${theme.colors.blue[500]};
    border-color: ${theme.colors.blue[500]};
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
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 0.25rem;
  width: 100%;
  
  &:focus {
    outline: 1px solid ${theme.colors.blue[500]};
    border-color: ${theme.colors.blue[500]};
  }
  
  &::placeholder {
    color: ${theme.colors.gray[500]};
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  color: ${theme.colors.gray[500]};
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
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${theme.colors.white};
  width: 100%; // 그리드에서 균등하게

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const EmptyMessage = styled.p`
  ${fonts.P2};
  color: ${theme.colors.red};
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
  color: ${theme.colors.gray[600]};
  ${fonts.P2};
`;

export const UserAvatar = styled.div<{ imgUrl?: string | null }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid ${theme.colors.gray[400]};
  background-color: ${({ imgUrl }) => (imgUrl ? 'transparent' : theme.colors.gray[400])};
  background-image: ${({ imgUrl }) => (imgUrl ? `url(${imgUrl})` : 'none')};
  background-size: cover;
  background-position: center;

  @media (max-width: 600px) {
    margin-bottom: 0.5rem;
  }
`;

export const UserName = styled.span`
  color: ${theme.colors.black};
  ${fonts.P3};
`;

export const UserNumber = styled.span`
  color: ${theme.colors.gray[600]};
  ${fonts.P2};
`;

export const StatusBadge = styled.div<{ isSubmitted: boolean }>`
  padding: 4px 8px;
  color: ${({ isSubmitted }) => isSubmitted ? theme.colors.blue[500] : theme.colors.red[300]};
  border-radius: 4px;
  ${fonts.P3};

  @media (max-width: 600px) {
    margin-top: 0.5rem;
  }
`;
