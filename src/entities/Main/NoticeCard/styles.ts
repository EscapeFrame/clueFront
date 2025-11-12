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
`;

export const Title = styled.h2`
  ${fonts.P3}
  font-weight: 600;
  color: ${colors.primary};
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
  color: ${colors.primary};
  margin: 0;
  font-weight: 500;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start; /* 타이틀 왼쪽 */
  align-items: center;
`;

export const ListItem = styled.li`
  border-radius: 8px;
  border: 1px solid ${colors.gray[2]};
  background: ${colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.blue.light1};
  }
`;

export const ItemTitle = styled.span`
  ${fonts.P2}
  color: ${colors.black};
  display: flex;
  align-items: center;
`;

export const ItemDate = styled.span`
  ${fonts.P1}
  color: ${colors.gray[4]};
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