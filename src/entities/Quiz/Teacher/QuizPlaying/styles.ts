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
    padding: 0 20rem;
`;

export const Card = styled.div`
    width: 100%; 
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

export const OptionsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, auto);
    gap: 1rem;
    margin-top: 1rem;
`;

export const OptionLarge = styled.div<{ bgColor: string; borderColor: string }>`
    background-color: ${(p) => p.bgColor};
    border: 2px solid ${(p) => p.borderColor};
    border-radius: 15px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 600;
    font-size: 1.2rem;
    gap: 1rem;
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

export const SubmitButton = styled.button`
  width: 100%;
  margin: 20px;
  padding: 0.5rem;
  ${fonts.P2};
  color: ${colors.white};
  background: ${colors.primary};
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: ${colors.blue.dep1};
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  ${fonts.P3};
`;

export const PointText = styled.span`
  color: ${colors.primary};  
  ${fonts.P5};
  font-weight: 600;
`;