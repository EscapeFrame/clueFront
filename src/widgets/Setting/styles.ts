import styled from '@emotion/styled';
import { gray } from '@/shared/styles/theme.styles';
import { fonts } from '@/shared/styles/font.styles';

export const SettingButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${gray[100]};
  border-radius: 8px;
  padding: 0.6rem 1rem;
  ${fonts.P2};
  cursor: pointer;
  border: none;
  outline: none;
  gap: 10px;
`;