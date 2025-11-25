import styled from "@emotion/styled";
import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";
import { IoIosArrowForward } from "react-icons/io";

export const Container = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  ${fonts.P4}
  text-align: center;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  max-height: 420px; // 5개 정도 아이템 보이도록 제한
  overflow-y: auto;
  padding-right: 8px; // 스크롤바 공간 확보용
`;

export const Item = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Left = styled.div`
  position: relative;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Circle = styled.div<{ isNow?: boolean; isLunch?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ isNow }) =>
    isNow ? colors.primary : colors.white};
  color: ${colors.black};
  border: 2px solid ${({ theme }) => theme.colors.blue[500]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Right = styled.div`
  flex: 1;
  cursor: pointer;
`;

export const Card = styled.div<{ isNow?: boolean; isLunch?: boolean }>`
  border: 1px solid ${colors.gray[2]};
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
  color: ${colors.black};
  border: 2px solid ${(isNow) => (isNow ? colors.gray[2] : colors.blue.light1)};

  background: ${({ isNow }) => (isNow ? colors.gray[2] : colors.white)};

  border-radius: 12px;
`;

export const Period = styled.div`
  ${fonts.P4}
  color: ${colors.primary};
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Subject = styled.div`
  ${fonts.P4}
  font-weight: 600;
  display: flex;
  gap: 12px;
`;

export const Description = styled.div`
  ${fonts.P1}
  color: ${colors.gray[4]};
  margin-top: 4px;
`;

export const ArrowIcon = styled(IoIosArrowForward)`
  ${fonts.P4};
  color: ${colors.gray[4]};
  flex-shrink: 0;
`;

export const TimeText = styled.div`
  ${fonts.P2}
  color: ${colors.gray[4]};
  margin-left: auto;
`;