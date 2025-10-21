import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";

export const Card = styled.a<{ isUrgent: boolean }>`
  position: relative;
  display: block;
  width: 100%; // 부모 너비에 꽉 차게 변경
  max-width: 300px; // 최대 너비 제한
  height: auto; // 내용에 맞게 높이 자동 조절
  padding: 2rem 1.5rem;
  border-radius: 8px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  text-decoration: none;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #E9E9E9;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1200px) {
    max-width: 250px;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
`;

export const DisabledCard = styled.div<{ isUrgent: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  max-width: 300px;
  height: auto;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.gray[400]};
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
  cursor: not-allowed;
  overflow: hidden;
  user-select: none;

  @media (max-width: 1200px) {
    max-width: 250px;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
`;

export const Title = styled.div`
  ${fonts.P3}
  font-weight: 500;
  margin: 1rem 0;
`;

export const DDayText = styled.div<{ isUrgent: boolean }>`
  ${fonts.P2}
  color: ${({ isUrgent }) =>
    isUrgent ? theme.colors.red : "white"};
  background: ${({isUrgent}) => isUrgent ? "#FFE3E9" : "#0077FF"};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: ${({ isUrgent }) =>
    isUrgent ? `1px solid ${theme.colors.red}` : "none"};
  display: inline-block;


  @media (max-width: 768px) {
    font-weight: 600;
    ${fonts.P1}
  }
`;

export const Content = styled.div`
  ${fonts.P1};
  color: ${theme.colors.gray[500]};
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
  }
`;

export const Submit = styled.div`
  ${fonts.P1};
  color: ${theme.colors.gray[600]};
  text-align: right;
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;

  @media (max-width: 1200px) {
    ${fonts.P2};
    bottom: 0.8rem;
    right: 1.5rem;
  }

  @media (max-width: 768px) {
    ${fonts.P2};
    bottom: 0.5rem;
    right: 1rem;
    text-align: center;
    left: 0;
  }
`;
