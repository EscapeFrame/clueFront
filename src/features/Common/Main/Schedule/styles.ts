import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  min-width: 600px;
  padding: 3rem 2rem;
  background: ${colors.white};;
  width: 100%;
  border-radius: 24px;
  border: 1px solid ${colors.gray[2]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    padding: 2rem 1rem;
  }
  
  @media (max-width: 768px) {
    align-items: center;
    padding: 1rem 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const DaySelector = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const DayButton = styled.button<{ active: boolean; isToday: boolean }>`
  ${fonts.P2}
  padding: 0.5rem 1rem;
  border: 2px solid ${({ active, isToday }) => 
    active ? colors.primary : isToday ? colors.blue.light2 : colors.gray[2]};
  background: ${({ active }) => active ? colors.primary : colors.white};
  color: ${({ active }) => active ? colors.white : colors.black};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${({ active, isToday }) => (active || isToday) ? 600 : 400};
  min-width: 50px;

  &:hover {
    background: ${({ active }) => active ? colors.blue.dep2 : colors.gray[1]};
    border-color: ${({ active }) => active ? colors.blue.dep2 : colors.gray[3]};
  }

  @media (max-width: 768px) {
    ${fonts.P3}
    padding: 0.4rem 0.8rem;
    min-width: 40px;
    flex: 1;
  }
`;

export const Title = styled.h1`
  ${fonts.P5}
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P4};
  }
`;

export const Explain = styled.p`
  ${fonts.P2}
  color: ${colors.gray[4]};
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P1};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-top: 1rem;
  padding: 2rem;
  background: ${colors.white};
  border-radius: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

export const Half = styled.div`
  flex: 1;
  min-width: 0; // flex item 줄바꿈 방지

  @media (max-width: 768px) {
    width: 100%;
  }
`;