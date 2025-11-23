import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: ${colors.gray[1]};
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 12px;
  }
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
  width: 700px;
  max-width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 720px) {
    padding: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

// HeaderWrapper already exists; set max-width so it aligns with Card
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  max-width: 100%;

  @media (max-width: 720px) {
    width: 100%;
    padding: 0 8px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
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
  margin: 0;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export const Explanation = styled.p`
  margin-top: 8px;
  color: #4b5563;
  text-align: center;
`;

export const ResultIcon = styled.div`
  font-size: 48px;
  line-height: 1;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    font-size: 40px;
    margin-bottom: 8px;
  }
`;

export const NextButton = styled.button`
  margin-top: 20px;
  padding: 12px 0;
  width: 700px;
  max-width: 100%;
  background-color: ${colors.primary};
  color: white;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;

  @media (max-width: 640px) {
  padding: 10px 0;
  font-size: 16px;
  width: 100%;
  }
`;
 
