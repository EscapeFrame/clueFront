import styled from "@emotion/styled";
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

interface TabButtonProps {
  active?: boolean;
}

export const TabSelector = styled.div`
  background-color: ${colors.white};
  padding: 0 14rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    gap: 1rem;
  }
`;

export const TabButton = styled.button<TabButtonProps>`
  position: relative;
  padding: 0.5rem 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${fonts.P2};
  color: ${({ active }) => (active ? colors.black : colors.gray[4])};
  font-weight: ${({ active }) => (active ? 600 : "normal")};
  transition: color 0.25s ease, font-weight 0.25s ease;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${colors.primary};
    border-radius: 2px;
    transform: translateX(-50%) scaleX(${({ active }) => (active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.35s ease;
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }

  &:hover {
    color: ${({ active }) => (active ? colors.black : colors.primary)};
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    ${fonts.P2};
  }
`;