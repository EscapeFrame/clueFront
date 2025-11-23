
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";

const fadeInSlideLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

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
  ${fonts.P5};
  font-weight: 600;
  margin-bottom: 3rem;
`;

export const PodiumContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 10px;
  gap: 8px;

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
`;

export const PodiumBox = styled.div<{
    bgColor: string;
    borderColor: string;
    height: number;
    rank: number;
    isVisible: boolean;
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
  height: ${(p) => p.height}px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  opacity: ${(p) => p.isVisible ? 1 : 0};
  transform: ${(p) => p.isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)'};
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
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
  text-align: center;
`;

export const StudentName = styled.div`
  ${fonts.P2};
  font-weight: 600;
  text-align: center;
  word-break: keep-all;
`;

export const RemainingList = styled.div<{ showRemaining: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${colors.white};
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  opacity: ${(p) => p.showRemaining ? 1 : 0};
  transform: ${(p) => p.showRemaining ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.5s ease-out;
`;

export const RemainingItem = styled.div<{ index: number }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${colors.gray[2]};
  ${fonts.P2};
  
  animation: ${fadeInSlideLeft} 0.3s ease-out both;
  animation-delay: ${(p) => p.index * 0.05}s;

  &:last-child {
    border-bottom: none;
  }
`;

export const RankNumber = styled.span`
  font-weight: 700;
  color: ${colors.primary};
  min-width: 30px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  margin: 10px 0;
`;

export const RetrunButton = styled.button`
  padding: 0.75rem 1.5rem;
  ${fonts.P2};
  font-weight: 600;
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.blue.light2};
  }
`;

export const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  ${fonts.P2};
  color: ${colors.white};
  background-color: ${colors.primary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.blue.light2};
    color: ${colors.primary};
  }
`;