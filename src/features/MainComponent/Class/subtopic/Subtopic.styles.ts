import styled from '@emotion/styled';
import { fonts } from '@/shared/styles/font.styles';

export const MiniCard = styled.div<{ isActive: boolean }>`
  background: #FFF;
  padding: 10px 36px;
  display: flex;
  float: left;
  ${fonts.P2};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #578FCA' : 'none')};
  cursor: pointer;
`;