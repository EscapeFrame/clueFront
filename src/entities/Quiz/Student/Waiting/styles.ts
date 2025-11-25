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
    font-size: 24px;
    font-weight: bold;
    margin: 0;
`;

export const Explanation = styled.div`
    font-size: 14px;
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

export const RoomCode = styled.div`
    ${fonts.P4}
    font-weight: 500;
    color: ${colors.primary}
`;

export const SubTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: ${colors.gray[4]};
`;

export const ParticipantList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    max-height: 200px;
    overflow-y: auto;
    padding: 8px;
`;

export const ParticipantItem = styled.div`
    background-color: ${colors.gray[1]};
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    color: ${colors.gray[4]};
`;

export const EmptyText = styled.p`
    font-size: 14px;
    color: ${colors.gray[4]};
    margin: 8px 0;
`;