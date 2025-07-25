/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const CardContainer = styled.div`
  width: 100%;
  height: 280px;
  padding: 1rem;
  background: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Title = styled.h2`
  ${fonts.P3}
  font-weight: 600;
  color: ${theme.colors.black};
  margin: 0 0 12px 0;
  padding: 0;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  margin: 0;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.blue[100]};
  }
`;

export const ItemTitle = styled.span`
  ${fonts.P2}
  color: ${theme.colors.black};
  margin: 0;
  padding: 0;
`;

export const ItemDate = styled.span`
  ${fonts.P1}
  color: ${theme.colors.gray[600]};
  margin: 0;
  padding: 0;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 32px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;