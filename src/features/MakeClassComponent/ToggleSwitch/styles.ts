import styled from '@emotion/styled';
import { gray, blue, white } from '@/shared/styles/theme.styles';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 64px;
  height: 32px;
`;

export const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${blue[500]};
  }

  &:checked + span::before {
    transform: translate(40px, -50%);
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${gray[200]};
  transition: 0.3s;
  border-radius: 24px;
  padding: 0 3px; // 좌우 여백 보정 (옵션)

  &::before {
    content: '';
    position: absolute;
    height: 18px;
    width: 18px;
    left: 3px; // 왼쪽 여백
    top: 50%;
    transform: translateY(-50%);
    background-color: ${white};
    transition: 0.3s;
    border-radius: 50%;
  }
`;