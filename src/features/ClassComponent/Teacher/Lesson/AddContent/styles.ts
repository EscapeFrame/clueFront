import { fonts } from '@/shared/styles/font.styles';
import { blue } from '@/shared/styles/theme.styles';
import styled from '@emotion/styled';

export const AddContentButton = styled.button`
  background-color: ${blue[400]};
  ${fonts.P2}
  text-align: center;
  width: 100%;
  padding: 10px 0;
  margin-top: 15px;
  cursor: pointer;
  stroke: none;
  border: none;
  border-radius: 8px;
`;