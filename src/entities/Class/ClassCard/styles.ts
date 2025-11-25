import { fonts } from '@/shared/theme/font.styles';
import { colors } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const Card = styled.div`
  border: 1px solid ${colors.gray[3]};
  padding: 1rem;
  border-radius: 12px;
  background-color: ${colors.gray[1]};
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 1200px) {
    padding: 0.8rem;
    height: 9rem;
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    height: auto;
    border-radius: 10px;
    min-height: 120px;
  }
`;

export const Title = styled.h3`
  ${fonts.P3}
  font-weight: 600;
  margin: 0;
  padding: 0;

  @media (max-width: 1200px) {
    ${fonts.P2}
  }

  @media (max-width: 768px) {
    ${fonts.P1}
  }
`;

export const Description = styled.div`
  ${fonts.P1}
  color: ${colors.gray[4]};
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;

  @media (max-width: 1200px) {
    ${fonts.P2}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
    flex-direction: column;
    gap: 0.3rem;
  }
`;

export const GoToLink = styled.button`
  border: none;
  align-self: flex-end;
  ${fonts.P2}
  color: ${colors.primary};
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    color: ${colors.blue.dep1};
  }

  @media (max-width: 1200px) {
    ${fonts.P3}
  }

  @media (max-width: 768px) {
    ${fonts.P3}
    align-self: center;
  }
`;