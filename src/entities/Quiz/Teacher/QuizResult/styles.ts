import styled from "@emotion/styled";
import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  min-height: 100vh;
  text-align: center;
  background-color: ${colors.gray[1]};

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const Question = styled.h2`
  ${fonts.P4};
  color: ${colors.black};
  margin: 10px;
  padding: 0px;
`;

export const CorrectIndex = styled.div`
  ${fonts.P5};
  font-weight: 600;
  color: ${colors.primary};
  margin-bottom: 2rem;
  padding: 0px;
`;

export const Card = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background-color: ${colors.white};
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
  min-height: 400px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const OptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const OptionBox = styled.div<{ bgColor: string; borderColor: string; height: number }>`
  background-color: ${(p) => p.bgColor};
  border: 1.5px solid ${(p) => p.borderColor};
  border-radius: 15px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(p) => p.height}px;
  transition: height 0.3s ease;

  @media (max-width: 720px) {
    padding: 1rem;
    height: ${(p) => Math.min(p.height, 220)}px;
  }
`;

export const CountNumber = styled.div`
  ${fonts.P3};
`;

export const OptionLabel = styled.div<{ bgColor: string; borderColor: string;}>`
  ${fonts.P2};
  font-weight: 600;
  text-align: center;
  width: 100%;
  padding: 1rem 0;
  background-color: ${(p) => p.bgColor};
  border: 1.5px solid ${(p) => p.borderColor};
  border-radius: 10px;
  white-space: nowrap;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  margin: 10px;
`;

export const RakingButton = styled.button`
  ${fonts.P2};
  font-weight: 600;
  color: ${colors.primary};
  border: 1px solid ${colors.primary};;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${colors.blue.light2};
    border: none;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.6rem 1.2rem;
  ${fonts.P2};
  font-weight: 600;
  color: ${colors.white};
  background-color: ${colors.primary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${colors.blue.light2};
    color: ${colors.primary};
  }
`;