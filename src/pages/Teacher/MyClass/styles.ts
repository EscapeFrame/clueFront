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
`;

export const CardArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem 14rem 8rem 14rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TitleFont = styled.h1`
  ${fonts.P4};
  font-weight: 500;
  margin: 0;
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

  &:hover {
    background-color: ${colors.blue.dep1};
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
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${colors.gray[2]};
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  height: 10em;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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