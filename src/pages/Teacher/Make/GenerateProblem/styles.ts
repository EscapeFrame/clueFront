import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.white};
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  ${fonts.P2};
  color: ${colors.black};
  padding: 8px 0;
  margin-bottom: 8px;

  &:hover {
    color: ${colors.primary};
  }

  svg {
    font-size: 20px;
  }
`;

export const Title = styled.h1`
  ${fonts.P5};
  font-weight: 700;
  color: ${colors.black};
  margin: 0;
  text-align: center;
`;

export const Subtitle = styled.p`
  ${fonts.P2};
  color: ${colors.gray[4]};
  text-align: center;
  margin: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

export const SectionCard = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h2`
  ${fonts.P4};
  font-weight: 600;
  color: ${colors.black};
  margin: 0 0 8px 0;
`;

export const SectionDesc = styled.p`
  ${fonts.P1};
  color: ${colors.gray[4]};
  margin: 0 0 16px 0;
`;

export const SectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionItem = styled.div<{ selected: boolean }>`
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  ${fonts.P2};
  color: ${colors.black};
  background-color: ${({ selected }) =>
    selected ? colors.blue.light2 : colors.white};
  border: 1px solid ${({ selected }) =>
    selected ? colors.primary : colors.gray[3]};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ selected }) =>
      selected ? colors.blue.light2 : colors.gray[2]};
  }
`;

export const DifficultyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DifficultyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const DifficultyButton = styled.button<{ selected: boolean }>`
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid ${({ selected }) =>
    selected ? colors.primary : colors.gray[3]};
  background-color: ${({ selected }) =>
    selected ? colors.blue.light2 : colors.white};
  color: ${colors.black};
  ${fonts.P2};
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;

  &:hover {
    background-color: ${({ selected }) =>
      selected ? colors.blue.light2 : colors.gray[2]};
  }
`;

export const CountInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${fonts.P2};

  span {
    color: ${colors.black};
  }
`;

export const CountInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${colors.gray[3]};
  border-radius: 6px;
  ${fonts.P2};
  width: 200px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const ProblemTypeList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  flex-wrap: wrap;
`;

export const ProblemTypeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${fonts.P2};
  color: ${colors.black};

  label {
    cursor: pointer;
  }
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid ${colors.gray[3]};
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid ${colors.gray[3]};
  background-color: ${colors.white};
  color: ${colors.black};
  ${fonts.P3};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.gray[2]};
  }
`;

export const GenerateButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.white};
  ${fonts.P3};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.primary};
  }
`;

