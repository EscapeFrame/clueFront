import styled from '@emotion/styled';

export const TopContainer = styled.div`
  background: #D6EAFF;
  height: auto;
  overflow: hidden;
  padding-top: 30px;
`;

export const Container = styled.div`
  margin: auto 150px 30px 150px;
`;

export const CardContainer = styled.div`
  flex-direction: row;
  gap: 8px;
  margin-top: 15px;
  padding-bottom: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;