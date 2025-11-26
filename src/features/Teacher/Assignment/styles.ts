import { fonts } from '@/shared/theme/font.styles';
import { colors } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

interface StatusProps {
  $isSubmitted: boolean;
}

export const Container = styled.div`
  padding: 0 14rem;
  min-height: 100vh;

  @media (max-width: 1200px) {
    padding: 2rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Card = styled.div`
  background: ${colors.white};
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 200px;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-height: 180px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  gap: 1rem;
`;

export const Description = styled.div`
  ${fonts.P3};
  color: ${colors.blue.dep1};
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  padding: 8px 12px;
  background: ${colors.blue.light1};
  border-radius: 8px;
  border: 1px solid ${colors.blue.light2};
  margin-right: 1rem;
  @media (max-width: 1200px) {
    ${fonts.P2}
  }

  @media (max-width: 768px) {
    ${fonts.P1};
    margin-right: 0.5rem;
  }
`;

export const LeftGroup = styled.div`
 display: flex;
 align-items: center;
 flex: 1 1 auto;
 min-width: 0;
`; 
 
 export const RightGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h3`
  margin: 0;
  ${fonts.P4}
  font-weight: 600;
  color: ${colors.black};
`;

export const Status = styled.span<StatusProps>`
  ${fonts.P2};
  font-weight: 700;
  color: ${({ $isSubmitted }) => ($isSubmitted ? colors.primary : colors.red[3])};
  border: 1.5px solid ${({ $isSubmitted }) => ($isSubmitted ? colors.blue.dep1 : colors.red[3])};
  padding: 2px 8px;
  border-radius: 12px;
  user-select: none;
`;

export const Body = styled.div`
  padding: 0 16px 12px 16px;
  ${fonts.P3};
  color: ${colors.gray[4]};
`;

export const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;

  .deadline {
    color: ${colors.gray[4]};
  }

  .remaining {
    color: ${colors.gray[4]};
  }
`;

export const Footer = styled.div`
  padding: 8px 16px 16px 16px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;

  button {
    flex: 1;
  }
`;

export const DetailHeading = styled.h4`
  ${fonts.P3}
  font-weight: 600;
  margin: 16px 0 8px;
`;

export const DetailText = styled.p`
  margin: 4px 0;
  ${fonts.P2};
  color: ${colors.black};

  strong {
    font-weight: 700;
  }
`;

export const DetailSection = styled.div`
  padding: 8px 0;
`;

export const SettingButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  cursor: pointer;
  ${fonts.P2};
  border-radius: 8px;
`;

export const ErrorText = styled.p`
  ${fonts.P3}
  color: ${colors.red[3]};
`;