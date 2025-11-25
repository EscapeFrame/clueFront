import { fonts } from '@/shared/theme/font.styles';
import { colors } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const TableWrapper = styled.div`
  flex: 2;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`;

export const Title = styled.div`
  ${fonts.P4}
  text-align: center;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const HeaderCell = styled.th`
  padding: 0.75rem;
  background: ${colors.blue.light4};
  border: 1px solid ${colors.gray[3]};
`;

export const TimeCell = styled.td`
  padding: 0.5rem;
  width: 4rem;
  background: ${colors.gray[1]};
  border: 1px solid ${colors.gray[3]};
  font-weight: 600;
  text-align: center;
`;

export const Cell = styled.td<{ isLunch?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${colors.gray[3]};
  background: ${({ isLunch }) => (isLunch ? '${colors.gray[2]}' : '${colors.white}')};
  text-align: center;
  white-space: pre-line;
`;