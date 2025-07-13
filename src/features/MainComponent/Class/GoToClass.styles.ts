import styled from '@emotion/styled';
import { white } from '@/shared/styles/theme.styles';

export const TopContainer = styled.div`
  background: #FFF;
  height: auto;
  overflow: hidden;
  padding-top: 30px;
`;

export const Container = styled.div`
  ${white};
  margin: auto 150px 30px 150px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 8px;
  margin-top: 15px;
  padding-bottom: 16px;
  scroll-snap-type: x mandatory;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;