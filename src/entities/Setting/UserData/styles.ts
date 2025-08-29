import styled from "@emotion/styled";
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${theme.colors.gray[200]};
  cursor: pointer;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  ${fonts.P4};
  color: ${theme.colors.black};
`;

export const Body = styled.div`
  ${fonts.P2};
  color: ${theme.colors.gray[600]};
`;


export const ToggleWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + label {
    background-color: ${theme.colors.blue[500]};
  }

  &:checked + label::after {
    transform: translateX(20px);
  }
`;

export const ToggleLabel = styled.label`
position: absolute;
top: 0;
left: 0;
width: 40px;
height: 20px;
background-color: ${theme.colors.gray[300]};
border-radius: 20px;
cursor: pointer;
transition: background-color 0.2s;

&::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 2px;
  left: 2px;
  background-color: ${theme.colors.white};
  border-radius: 50%;
  transition: transform 0.2s;
}
`;
