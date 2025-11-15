/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const CardContainer = styled.div`
  width: 100%;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  ${fonts.P4}
  font-weight: 700;
  color: ${colors.black};
  margin: 0 0 16px 0;
  padding: 0;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  max-height: 250px; /* Adjust this value as needed */
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
    background-color: ${colors.blue.light1};
  }
`;

export const ItemTitle = styled.span`
  ${fonts.P2}
  color: ${colors.black};
  margin: 0;
  padding: 0;
`;

export const ItemDate = styled.span`
  ${fonts.P1}
  color: ${colors.gray[4]};
  margin-top: 4px;
  padding: 0;
`;

export const LoadingText = styled.p`
  ${fonts.P1}
  color: ${colors.gray[4]};
  margin: 0;
`;

export const ErrorText = styled.p`
  ${fonts.P1}
  color: ${colors.red[3]};
  margin: 0;
  text-align: center;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;