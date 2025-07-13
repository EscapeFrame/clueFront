import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #ccc;
  height: 189px;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;


export const ClassTitle = styled.h2`
  margin: 10px 0;
  font-weight: bold;
`;

export const ClassInfo = styled.p`
  color: #666;
  margin: 5px 0;
  font-size: 18px;
`;

export const GoToBtn = styled.p`
  color: #578FCA;
  text-align: right;
  cursor: pointer;
`;
