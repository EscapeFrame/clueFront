import styled from '@emotion/styled';
import { black, gray, white, blue } from "@/shared/styles/theme.styles";
import { fonts } from '@/shared/styles/font.styles';
export const CardWrapper = styled.div`
  padding: 20px;
  border-radius: 16px;
  border: 1px solid ${gray[200]};
  height: 189px;
  box-sizing: border-box;
  background-color: ${white};
  cursor: pointer;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;


export const ClassTitle = styled.h2`
  margin: 10px 0;
  font-weight: 500;
`;

export const ClassInfo = styled.p`
  color: ${gray[300]};
  margin: 5px 0;
  ${fonts.P2}
`;

export const GoToBtn = styled.p`
  color: ${blue[600]};
  text-align: right;
  cursor: pointer;
`;
