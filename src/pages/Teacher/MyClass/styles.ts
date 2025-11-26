import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(125vh - 50px);
  background-color: ${colors.gray[1]};
  overflow: hidden;
`;

export const HeaderSection = styled.div`
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  padding: 2rem 14rem 0 14rem;
  z-index: 10;
  flex-shrink: 0;

  @media (max-width: 1400px) {
    padding: 2rem 8rem 0 8rem;
  }

  @media (max-width: 1200px) {
    padding: 2rem 4rem 0 4rem;
  }

  @media (max-width: 992px) {
    padding: 1.5rem 2rem 0 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1rem 0 1rem;
  }
`;

export const CardArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem 14rem 8rem 14rem;

  @media (max-width: 1400px) {
    padding: 2rem 8rem 8rem 8rem;
  }

  @media (max-width: 1200px) {
    padding: 2rem 4rem 6rem 4rem;
  }

  @media (max-width: 992px) {
    padding: 1.5rem 2rem 4rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1rem 3rem 1rem;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

export const TitleFont = styled.h1`
  ${fonts.P4};
  font-weight: 500;
  margin: 0;

  @media (max-width: 992px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
    text-align: center;
  }
`;

export const AddButton = styled.button`
  background-color: ${colors.primary};
  border-radius: 8px;
  cursor: pointer;
  width: 150px;
  height: 36px;
  border: none;
  color: ${colors.white};
  ${fonts.P2};
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background-color: ${colors.blue.dep1};
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 40px;
  }
`;

export const ErrorMessage = styled.p`
  color: ${colors.red[3]};
  margin-bottom: 8px;
`;

export const EmptyMessage = styled.p`
  color: ${colors.gray[4]};
  ${fonts.P2};
  text-align: center;
  margin-top: 2rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: ${colors.white};
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.gray[2]};
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  min-height: 12rem;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1200px) {
    padding: 0.8rem;
    min-height: 240px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-height: auto;
  }
`;

export const CardTitle = styled.h2`
  ${fonts.P3};
  font-weight: 500;
  margin: 0 0 4px 0;
`;

export const CardDescription = styled.p`
  color: ${colors.gray[4]};
  ${fonts.P2};
  margin-top: 5px;
`;

export const InfoContent = styled.p`
  color: ${colors.gray[4]};
  ${fonts.P2};
  margin: 0;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const IconWrapper = styled.div`
  ${fonts.P4};
  background-color: ${colors.blue.light2};
  color: ${colors.primary};
  border-radius: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// AI Flow 배너 스타일
export const AIFlowBanner = styled.div`
  background: ${colors.blue.light4};
  padding: 1.5rem 14rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  @media (max-width: 1200px) {
    padding: 1.5rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

export const BannerContent = styled.div`
  flex: 1;
`;

export const BannerTitle = styled.h2`
  ${fonts.P4};
  font-weight: 600;
  color: ${colors.white};
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const BannerDescription = styled.p`
  ${fonts.P2};
  color: rgba(255, 255, 255, 0.9);
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P1};
  }
`;
