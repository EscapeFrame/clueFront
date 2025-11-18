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
    background-color: ${colors.white};
    text-align: center;
    gap: 10px;

    @media (max-width: 720px) {
        width: 100%;
        padding: 16px;
    }
`;

export const Title = styled.h2`
  ${fonts.P4}
  font-weight: 600;
  color: ${colors.primary};
  margin: 0;
  padding: 0;
`;

export const Character = styled.div`
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 16px 0;
`;

export const MyRanking = styled.div`
  ${fonts.P3};
`;

export const MyScore = styled.div`
  ${fonts.P3};
  font-weight: 600;
  color: ${colors.primary};
`;

export const Item = styled.div<{ color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${({ color }) => color ?? colors.black};
  font-weight: 600;
  ${fonts.P3}

  span {
    ${fonts.P4};
    font-weight: 600;
  }

  svg {
    ${fonts.P4};
  }
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 12px 0;
  width: 100%;
  background-color: ${colors.primary};
  color: white;
  border-radius: 8px;
  border: none;
  ${fonts.P3};
  cursor: pointer;
`;