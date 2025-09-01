/** @jsxImportSource @emotion/react */
import { fonts } from "@/shared/theme/font.styles";
import { theme } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Card = styled.div`
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 16px;
  padding: 1.2rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: ${theme.colors.blue[400]}
  }
`;

export const CardTitle = styled.h3`
  ${fonts.P4} 
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

export const CardList = styled.ul`
  ${fonts.P2}
  color: ${theme.colors.gray[500]};
  list-style: none;
  margin: 0;
  padding: 10px;
`;

export const CardListItem = styled.li`
  margin-bottom: 6px;

  &::before {
    content: "•";
    margin-right: 6px;
    color: ${theme.colors.gray[500]};
  }
`;