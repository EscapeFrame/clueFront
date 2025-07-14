import { fonts } from '@/shared/styles/font.styles';
import { blue, gray } from '@/shared/styles/theme.styles';
import styled from '@emotion/styled';

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

export const AssignmentTitleBox = styled.div`
  margin-bottom: 20px;
`;

export const AssignmentTitle = styled.h2`
  margin: 0;
  ${fonts.P3}
`;

export const AssignmentDeadline = styled.div`
  color: ${gray[300]};
  margin-top: 4px;
  ${fonts.P1}
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
`;

export const FilterSelect = styled.select`
  padding: 6px 30px;
  ${fonts.P1}
  background-color: ${gray[150]};
`;

export const FilterInput = styled.input`
  flex-grow: 1;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid ${gray[200]};
  border-radius: 4px;
`;

export const ListHeader = styled.div`
  display: flex;
  font-weight: 500;
  border-bottom: 2px solid ${gray[250]};
  padding-bottom: 8px;
  margin-bottom: 8px;
`;

export const ListHeaderItem = styled.span<{ flex?: number; right?: boolean }>`
  flex: ${({ flex }) => flex || 1};
  ${({ right }) => right && 'text-align: right;'}
`;

export const StudentRow = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid ${gray[200]};
  align-items: center;
  ${fonts.P1}
  gap: 50%;
`;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const StudentCell = styled.span<{ submitted?: boolean }>`
  color: ${({ submitted }) => submitted ? blue[650] : 'inherit'};
`;

export const StudentAction = styled.a<{ right?: boolean }>`
  ${({ right }) => right && 'text-align: right;'}
  color: ${blue[650]};
  text-decoration: underline;
  cursor: pointer;
`;

export const StudentGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 0;
  gap: 24px;
`;

export const InfoGroup = styled.div`
  display: flex;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  white-space: nowrap;
`;