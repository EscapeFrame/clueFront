import { fonts } from '@/shared/styles/font.styles';
import { white, blue  } from '@/shared/styles/theme.styles';
import styled from '@emotion/styled';

export const Body = styled.div`
  padding: 40px 150px;
  background-color: ${white};
`;

export const TitleFont = styled.h1`
  ${fonts.P3}
  margin-bottom: 24px;
`;

export const AddButton = styled.button`
  background-color: ${blue[500]};
  border-radius: 6px;
  height: auto;
  cursor: pointer;
  width: 180px;
  height: 36px;
  border-width: 0;
  ${fonts.P2};
`;

export const Flexible = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ModalInput = styled.input`
  width: 100%;
  ${fonts.P2}
`