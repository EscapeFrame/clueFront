import styled from "@emotion/styled";
import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  min-height: 100vh;
  background-color: ${colors.gray[1]};
  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${fonts.P3};
  font-weight: 600;
`;

export const PodiumContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 10px;
  gap: 12px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PodiumItem = styled.div<{ rank: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  order: ${(p) => (p.rank === 1 ? 2 : p.rank === 2 ? 1 : 3)};
  margin: 10px;
`;

export const PodiumBox = styled.div<{ 
  bgColor: string; 
  borderColor: string; 
  height: number;
  rank: number;
}>`
  background-color: ${(p) => p.bgColor};
  border: 1px solid ${(p) => p.borderColor};
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  max-width: 100%;
  height: ${(p) => p.height}px;
  transition: all 0.3s ease;

  @media (max-width: 720px) {
    padding: 1rem;
    width: 160px;
    height: ${(p) => Math.min(p.height, 260)}px;
  }
`;

export const RankBadge = styled.div`
  ${fonts.P3};
  font-weight: 700;
  color: ${colors.black};
`;

export const StudentName = styled.div`
  ${fonts.P2};
  font-weight: 600;
`;

export const StudentScore = styled.div`
  ${fonts.P2};
  font-weight: 600;
  color: ${colors.gray[5]};
  margin-left: auto;
`;

export const RemainingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${colors.white};
  border-radius: 15px;
`;

export const RemainingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${colors.gray[2]};
  ${fonts.P2};

  &:last-child {
    border-bottom: none;
  }
`;

export const RankNumber = styled.span`
  font-weight: 700;
  color: ${colors.primary};
  min-width: 30px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
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
  width: fit-content;

  &:hover {
    background-color: ${colors.blue.light2};
    color: ${colors.primary};
  }
`;