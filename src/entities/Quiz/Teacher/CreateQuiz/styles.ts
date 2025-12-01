import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
    background-color: ${colors.gray[1]};
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Card = styled.div`
    width: 700px;
    padding: 3rem;
    border-radius: 20px;
    background-color: ${colors.white};
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Header = styled.div`
    text-align: center;
    margin: 0px;
    padding: 0px;
`;

export const Title = styled.h1`
    ${fonts.P4}
    font-weight: 600;
`;

export const Explanation = styled.p`
    color: ${colors.gray[4]};
    ${fonts.P2}
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.blue.light2};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid ${colors.blue.light4};
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SubTitle = styled.h2`
  ${fonts.P3};
  color: ${colors.primary};
  margin: 0;
  line-height: 1.2;
`;

export const SubExplantion = styled.p`
  color: ${colors.gray[4]};
  ${fonts.P2};
  margin: 0;        
  line-height: 1.2;
`;

export const TitleInput = styled.input`
    width: auto;
    border: 1.5px solid ${colors.gray[3]};
    border-radius: 10px;
    padding: 12px 14px;
    ${fonts.P3};

    &:focus {
        outline: none;
        border-color: ${colors.primary};
        box-shadow: 0 0 0 3px rgba(76, 110, 245, 0.15);
    }
`;

export const Input = styled.input`
    width: auto;
    border: 1.5px solid ${colors.gray[3]};
    border-radius: 10px;
    padding: 12px 14px;
    ${fonts.P3};
    text-align: right;

    &:focus {
        outline: none;
        border-color: ${colors.primary};
        box-shadow: 0 0 0 3px rgba(76, 110, 245, 0.15);
    }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
`;

export const BackButton = styled.button`
  flex: 1;
  padding: 10px 0;
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: ${colors.gray[3]};
    color: ${colors.black};
    border: none;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 10px 0;
  background-color: ${colors.primary};
  border: none;
  color: ${colors.white};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: ${colors.gray[3]};
    color: ${colors.black};
  }
`;