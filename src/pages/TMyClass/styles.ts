import styled from '@emotion/styled';
import { white, black, blue } from '@/shared/styles/theme.styles';
import { fonts } from '@/shared/styles/font.styles';

export const Body = styled.div`
  padding: 40px 150px;
  background-color: ${white};
`;

export const TitleFont = styled.h1`
${fonts.P4}
  margin-bottom: 24px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -10px;
`;

export const Plus = styled.div`
${fonts.P2}
  background-color: ${blue[400]};
  color: ${black};
  border-radius: 8px;
  padding: 5px 15px;
  cursor: pointer;
`;