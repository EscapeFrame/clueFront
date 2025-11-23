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
    padding: 16px;
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

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const Title = styled.h2`
    ${fonts.P4};
    font-weight: 600;
    margin: 0;
`;

export const Explanation = styled.div`
    ${fonts.P2};
    color: ${colors.gray[4]};
    margin: 0;
`;

export const CharacterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 150px;  
    height: 180px;   
    margin: 0 auto;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid ${colors.gray[3]};
    ${fonts.P2};
    box-sizing: border-box;
`;

export const Button = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: ${colors.primary};
    color: ${colors.white};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        opacity: 0.8;
    }
`;
