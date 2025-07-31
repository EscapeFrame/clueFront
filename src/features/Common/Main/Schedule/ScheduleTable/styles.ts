import { fonts } from '@/shared/theme/font.styles';
import { theme } from '@/shared/theme/theme.styles';
import styled from '@emotion/styled';

export const TableWrapper = styled.div`
  flex: 2;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Title = styled.div`
  ${fonts.P4}
  text-align: center;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const HeaderCell = styled.th`
  padding: 0.75rem;
  background: ${theme.colors.blue[400]};
  border: 1px solid ${theme.colors.gray[300]};
`;

export const TimeCell = styled.td`
  padding: 0.75rem;
  background: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[300]};
  font-weight: 600;
  text-align: center;
`;

export const Cell = styled.td<{ isLunch?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${theme.colors.gray[300]};
  background: ${({ isLunch }) => (isLunch ? '${theme.colors.gray[200]}' : '${theme.colors.white}')};
  text-align: center;
  white-space: pre-line;
`;