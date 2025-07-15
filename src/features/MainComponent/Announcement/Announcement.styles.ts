import styled from '@emotion/styled';
import { fonts } from '@/shared/styles/font.styles';

export const TopContainer = styled.div`
  height: auto;
  overflow: hidden;
  padding-top: 30px;
  background-color: #FFFF;
`;

export const Container = styled.div`
  margin: auto 150px 30px 150px;
`;

export const Card = styled.div`
  min-width: 270px;
  flex: 0 0 auto;
  height: 140px;
  border-radius: 12px;
  border: 1px solid #CCCCCC;
  padding: 25px 18px;
  text-align: left;
  box-shadow: 2px 3px 3px 0px #0000001A;
`;

export const Title = styled.span`
  ${fonts.P2};
  font-weight: bold;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;
