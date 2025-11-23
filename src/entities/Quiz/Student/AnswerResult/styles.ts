import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: ${colors.gray[1]};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const QuitButton = styled.button`
  background: none;
  border: none;
  color: ${colors.gray[4]};
  font-size: 16px;
  cursor: pointer;
`;

export const QuestionCount = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const Card = styled.div<{ $isWrong: boolean }>`
  background-color: ${({ $isWrong }) =>
        $isWrong ? "#fee2e2" : "#dcfce7"};
  border: 2px solid ${({ $isWrong }) =>
        $isWrong ? "#ef4444" : "#22c55e"};
  border-radius: 16px;
  padding: 24px;
  text-align: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CharacterImg = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 50%;
`;

export const MyRanking = styled.div`
  font-weight: 600;
`;

export const MyScore = styled.div`
  font-weight: 600;
`;

export const CardTitle = styled.h2<{ $isWrong: boolean }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $isWrong }) => ($isWrong ? "#ef4444" : "#22c55e")};
`;

export const Explanation = styled.p`
  margin-top: 8px;
  color: #4b5563;
`;

export const NextButton = styled.button`
  margin-top: 20px;
  padding: 12px 0;
  width: 100%;
  background-color: ${colors.primary};
  color: white;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
`;
