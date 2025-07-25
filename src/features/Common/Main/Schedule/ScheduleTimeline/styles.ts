import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';
import { IoIosArrowForward } from 'react-icons/io';

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

  max-height: 420px;  // 5개 정도 아이템 보이도록 제한
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
  background: ${({ isNow, theme }) =>
    isNow ? theme.colors.blue[500] : theme.colors.white};
  color: ${theme.colors.black};
  border: 2px solid
    ${({ theme }) => theme.colors.blue[500]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Right = styled.div`
  flex: 1;
  padding-left: 1rem;
  cursor: pointer;
`;

export const Card = styled.div`
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.gray[100]};
  }
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 48px;
  justify-content: center;
`;

export const Subject = styled.div`
  ${fonts.P2}
  font-weight: 600;
`;

export const Description = styled.div`
  ${fonts.P1}
  color: ${theme.colors.gray[500]};
  margin-top: 4px;
`;

export const ArrowIcon = styled(IoIosArrowForward)`
  font-size: 1.25rem;
  color: ${theme.colors.gray[400]};
  flex-shrink: 0;
`;