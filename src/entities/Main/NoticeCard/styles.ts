/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const CardContainer = styled.div`
  width: 100%;
  padding-top: 1rem;
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 1rem;
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
  overflow-y: auto;
`;

export const ListItem = styled.li`
border-radius: 8px;
border: 1px solid var(--gray-2, #E9E9E9);
background: var(--white, #FFF);
display: flex;
height: 60px;
padding: 1rem;
justify-content: space-between;
align-items: center;

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