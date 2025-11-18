import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    width: 700px;
`;

export const Section = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

export const QuitButton = styled.button`
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: ${colors.gray[4]};
    cursor: pointer;
    font-weight: 600;
    ${fonts.P2};

    &:hover {
        color: ${colors.primary};
    }
`;

export const QuestionCount = styled.div`
    font-weight: 600;
    color: ${colors.gray[4]};
    ${fonts.P2};
`;

export const TimeBarContainer = styled.div`
    width: 100%;
    height: 10px;
    background-color: #eee;
    border-radius: 5px;
    overflow: hidden;
`;

export const TimeBar = styled.div<{ progress: number }>`
    width: ${({ progress }) => progress}%;
    height: 100%;
    background-color: #4b6bff;
    transition: width 1s ease-in-out;
`;

export const TimeWrapper = styled.div`
    display: flex;
    justify-content: center;  
    align-items: center;      
    margin: 2rem;       
`;

export const TimeText = styled.div<{ timeLeft: number }>`
    background-color: ${({ timeLeft }) => (timeLeft <= 5 ? colors.red[3] : colors.primary)};
    color: white;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;      
    justify-content: center; 
    font-size: 24px;
    font-weight: bold;
    border-radius: 50%; 
    overflow: hidden;
    text-align: center;
`;