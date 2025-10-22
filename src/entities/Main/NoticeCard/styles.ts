/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const CardContainer = styled.div`
  width: 100%;
  min-height: 12rem;
  padding: 1.5rem;
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid ${theme.colors.gray[200]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
`;

export const Title = styled.h2`
  ${fonts.P4}
  font-weight: 700;
  color: ${theme.colors.black};
  margin: 0 0 16px 0;
  padding: 0;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  margin-bottom: 8px;
  transition: background-color 0.2s;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: ${theme.colors.blue[100]};
  }
`;

export const ItemTitle = styled.span`
  ${fonts.P3}
  font-weight: 600;
  color: ${theme.colors.black};
  margin: 0;
  padding: 0;
`;

export const ItemDate = styled.span`
  ${fonts.P2}
  color: ${theme.colors.gray[600]};
  margin-top: 4px;
  padding: 0;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 32px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyText = styled.p`
  ${fonts.P1}
  color: ${theme.colors.blue[500]};
  margin: 0;
  font-weight: 500;
`;

export const ErrorText = styled.p`
  ${fonts.P1}
  color: ${theme.colors.red}
  margin: 0;
  text-align: center;
`;

export const LoadingText = styled.p`
  ${fonts.P1}
  color: ${theme.colors.gray[500]};
  margin: 0;
`;