/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { fonts } from "@/shared/theme/font.styles";
import { theme } from "@/shared/theme/theme.styles";

export const Card = styled.div`
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 16px;
  padding: 1.2rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1200px) {
    padding: 1rem 0.8rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 0.6rem;
  }
`;

export const CardTitle = styled.h3`
  ${fonts.P4} 
  font-weight: 600;
  margin: 0;
  padding: 0;

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P2};
  }
`;

export const CardList = styled.ul`
  ${fonts.P2}
  color: ${theme.colors.gray[500]};
  list-style: none;
  margin: 0;
  padding: 10px;
  flex-grow: 1;

  @media (max-width: 1200px) {
    ${fonts.P3};
    padding: 8px;
  }

  @media (max-width: 768px) {
    ${fonts.P3};
    padding: 6px;
  }
`;

export const CardListItem = styled.li`
  margin-bottom: 6px;

  &::before {
    content: "•";
    margin-right: 6px;
    color: ${theme.colors.gray[500]};
  }

  @media (max-width: 1200px) {
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    margin-bottom: 4px;
  }
`;