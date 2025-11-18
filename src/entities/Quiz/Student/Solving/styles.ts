import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
    background-color: ${colors.gray[1]};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 8rem;
`;

export const Card = styled.div`
    width: 700px; 
    max-width: 100%;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: ${colors.white};
    text-align: center;

    @media (max-width: 720px) {
        width: 100%;
        padding: 16px;
    }
`;

export const Question = styled.div`
    ${fonts.P4};
    font-weight: 600;
    text-align: center;
`;

// 기본 옵션
export const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Option = styled.div<{
    selected?: boolean;
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
}>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    border: 2px solid ${({ borderColor }) => borderColor || colors.gray[3]};
    background-color: ${({ bgColor }) => bgColor || colors.white};
    color: ${({ textColor }) => textColor || colors.black};
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;

    &:hover {
        opacity: 0.85;
    }
`;

export const OptionNumber = styled.div`
    font-weight: 600;
    min-width: 24px;
    text-align: center;
`;

// moving 옵션
export const MovingBox = styled.div`
  position: relative;
  width: 650px;
  height: 300px;
  background-color: ${colors.npc.I1}; 
  border: 1px solid ${colors.npc.I2};
  border-radius: 16px;
  overflow: hidden;
`;

export const MovingOption = styled.div<{
  bgColor: string;
  borderColor: string;
  textColor: string;
}>`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${({ bgColor }) => bgColor};
  border: 2px solid ${({ borderColor }) => borderColor};
  color: ${({ textColor }) => textColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  user-select: none;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
`;

// 룰렛 옵션
export const RouletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RouletteWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;

  @media (max-width: 640px) {
    width: 260px;
    height: 260px;
  }
`;

export const RouletteSvg = styled.svg<{ rotation: number; isSpinning: boolean }>`
  transform: rotate(${props => props.rotation}deg);
  transition: ${props => (props.isSpinning ? 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none')};
`;

export const Pointer = styled.div`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 30px solid ${colors.primary};
  z-index: 10;
`;

export const Result = styled.div`
  text-align: center;
  animation: slideUp 0.5s ease-out;

  p {
    font-weight: 600;
    ${fonts.P3}
    color: ${colors.gray[4]};
  }

  strong {
    ${fonts.P3}
    color: ${colors.primary};
    font-weight: 600;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    p {
      ${fonts.P3};
    }
    strong {
      ${fonts.P3};
      font-weight: 600;
    }
  }
`;

// 버튼
export const Buttons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
`;

export const RetryButton = styled.button`
  flex: 1;
  padding: 10px 0;
  background-color: ${colors.white};
  border: 2px solid ${colors.primary};
  color: ${colors.primary};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    opacity: 0.8;
  }
`;

export const SubmitButton = styled.button<{ submitted: boolean }>`
  flex: 1;
  padding: 10px 0;
  width: ${({ submitted }) => (submitted ? "100%" : "auto")};
  background-color: ${({ submitted }) =>
    submitted ? colors.gray[3] : colors.primary};
  border: none;
  color: ${({ submitted }) =>
    submitted ? colors.gray[4] : colors.white};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.8;
  }
`;