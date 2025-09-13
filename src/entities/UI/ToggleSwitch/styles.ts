import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const Label = styled.label`
  font-weight: 500;
  ${fonts.P3};
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 64px;
  height: 32px;

  @media (max-width: 480px) {
    width: 48px;
    height: 24px;
  }
`;

export const Checkbox = styled.input<{ checked?: boolean }>`
  opacity: 0;
  width: 0;
  height: 0;

  &:focus + span {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus 시 outline */
  }

  &:checked + span {
    background-color: ${theme.colors.blue[500]};
  }

  &:checked + span::before {
    transform: translateX(40px) translateY(-50%);

    @media (max-width: 480px) {
    transform: translateX(30px) translateY(-50%);
    }
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.gray[200]};
  transition: 0.3s;
  border-radius: 24px;
  padding: 0 3px;

  &::before {
    content: '';
    position: absolute;
    height: 18px;
    width: 18px;
    left: 3px;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${theme.colors.white};
    transition: 0.3s;
    border-radius: 50%;

    @media (max-width: 480px) {
      height: 14px;
      width: 14px;
      left: 2px;
    }
  }

  @media (max-width: 480px) {
    padding: 0 2px;
    border-radius: 20px;
  }
`;