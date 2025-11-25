import styled from "@emotion/styled";
import { colors } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";

export const Card = styled.a<{ isUrgent: boolean }>`
  position: relative;
  display: block;
  width: 100%; // 부모 너비에 꽉 차게 변경
  height: auto; // 내용에 맞게 높이 자동 조절
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background-color: ${colors.white};
  color: ${colors.black};
  text-decoration: none;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid #E9E9E9;
  margin-bottom: 1rem;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1200px) {
    max-width: 100%;
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
  background-color: ${colors.gray[1]};
  color: ${colors.gray[4]};
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
  cursor: not-allowed;
  overflow: hidden;
  user-select: none;

  @media (max-width: 1200px) {
    max-width: 100%;
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
    isUrgent ? colors.red[3] : colors.white};
  background: ${({isUrgent}) => isUrgent ? colors.gray[2] : colors.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: ${({ isUrgent }) =>
    isUrgent ? `1px solid ${colors.red[3]}` : "none"};
  display: inline-block;


  @media (max-width: 768px) {
    font-weight: 600;
    ${fonts.P1}
  }
`;

export const Content = styled.div`
  ${fonts.P1};
  color: ${colors.gray[4]};
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
  color: ${colors.gray[4]};
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
  }
`;
