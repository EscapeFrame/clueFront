import styled from "@emotion/styled";
import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 0 1rem;
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
  color: ${colors.black};
  ${fonts.P3}
  display: flex;
  align-items: center; /* 텍스트 세로 중앙정렬 */
  height: 100%; /* 높이 꽉 채워서 정렬 안정화 */
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }

  &.active {
    background-color: ${colors.primary};
    color: ${colors.white};;
    border-radius: 16px;
    padding: 5px 20px;
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
  border: 1px solid ${colors.primary};
  border-radius: 4px 0 0 4px;
  outline: none;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  @media (max-width: 480px) {
    ${fonts.P3}
    padding: 0.4rem 0.8rem;
  }
`;
