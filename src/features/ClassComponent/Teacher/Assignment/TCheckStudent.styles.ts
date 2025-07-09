import styled from '@emotion/styled';

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial, sans-serif';
`;

export const AssignmentTitleBox = styled.div`
  margin-bottom: 20px;
`;

export const AssignmentTitle = styled.h2`
  margin: 0;
  font-size: 22px;
`;

export const AssignmentDeadline = styled.div`
  color: #666;
  margin-top: 4px;
  font-size: 14px;
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
`;

export const FilterSelect = styled.select`
  padding: 6px 30px;
  font-size: 14px;
  background-color: #f8f9fa;
`;

export const FilterInput = styled.input`
  flex-grow: 1;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ListHeader = styled.div`
  display: flex;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
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
  border-bottom: 1px solid #eee;
  align-items: center;
  font-size: 14px;
  gap: 50%;
`;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const StudentCell = styled.span<{ submitted?: boolean }>`
  color: ${({ submitted }) => submitted ? '#1ca661' : 'inherit'};
`;

export const StudentAction = styled.a<{ right?: boolean }>`
  ${({ right }) => right && 'text-align: right;'}
  color: #007bff;
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