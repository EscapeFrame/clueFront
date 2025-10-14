import styled from "@emotion/styled";
import { fonts } from "@/shared/theme/font.styles";
import { theme } from "@/shared/theme/theme.styles";

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  background-color: ${theme.colors.gray[200]};
  z-index: 1000;
`;

export const HeaderContainer = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  background-color: white;
  padding-bottom: 1rem;

`;

export const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 8rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 8rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

export const AddLinkButton = styled.button`
  ${fonts.P2}
  background-color: ${theme.colors.blue[800]};

  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${theme.colors.blue[700]};
  }

  @media (max-width: 480px) {
    ${fonts.P3}
    padding: 0.4rem 0.8rem;
  }
`;

export const ItemContainer = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Item = styled.div`
  margin-right: 1.25rem;
  text-decoration: none;
  color: ${theme.colors.black};
  ${fonts.P2}
  display: flex;
  align-items: center; /* 텍스트 세로 중앙정렬 */
  height: 100%; /* 높이 꽉 채워서 정렬 안정화 */
  cursor: pointer;

  &:hover {
    color: ${theme.colors.blue[600]};
  }

  @media (max-width: 480px) {
    margin-right: 0.75rem;
    ${fonts.P3}
  }
`;

export const SearchContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  ${fonts.P2}
  padding: 0.5rem 1rem;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 4px 0 0 4px;
  outline: none;

  &:focus {
    border-color: ${theme.colors.blue[600]};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  @media (max-width: 480px) {
    ${fonts.P3}
    padding: 0.4rem 0.8rem;
  }
`;
