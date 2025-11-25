import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

const cellWidth = '160px';

export const Container = styled.div`
  padding: 2rem 14rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1200px) {
    padding: 2rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

export const Title = styled.div`
  ${fonts.P5};
  font-weight: 600;

  @media (max-width: 768px) {
    ${fonts.P4};
  }

  @media (max-width: 480px) {
    ${fonts.P3};
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const TableArea = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const GridTable = styled.div<{ columnCount: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columnCount }) => columnCount}, ${cellWidth});
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(${({ columnCount }) => columnCount}, 120px);
    gap: 8px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 6px;
  }
`;

export const GridRow = styled.div<{ columnCount?: number }>`
  display: grid;
  grid-template-columns: ${({ columnCount = 1 }) =>
    `repeat(${columnCount}, 1fr) 40px`};
  gap: 8px;
  margin-bottom: 8px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const HeaderField = styled.input`
  width: 100%;
  border: none;
  font-weight: 600;
  background: transparent;
  ${fonts.P3};
  text-align: center;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    ${fonts.P2};
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px;
  color: ${colors.gray[4]};

  &:hover {
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    top: 2px;
    right: 2px;
  }
`;

export const CellBox = styled.div`
  width: 100%;
  border: 1px solid ${colors.gray[3]};
  border-radius: 8px;
  padding: 8px;
  min-height: 80px;
  cursor: pointer;
  background: ${colors.white};

  &:hover {
    border-color:${colors.primary};
  }

  @media (max-width: 768px) {
    min-height: 60px;
    padding: 6px;
  }
`;

export const SpacerCell = styled.div`
  width: 100%;
  height: 100%;
`;

export const HeaderBox = styled.div`
  position: relative;
  width: 100%;
  background: ${colors.blue.light1};
  padding: 10px;
  text-align: center;
  border-radius: 6px;
  ${fonts.P2};

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 80px;
  resize: vertical;
  ${fonts.P2};
  border: none;
  outline: none;
  padding: 0;
  background: transparent;
  font-family: inherit;

  @media (max-width: 768px) {
    min-height: 60px;
  }
`;

export const TextBlock = styled.div`
  white-space: pre-wrap;
  ${fonts.P2};
  color: ${colors.gray[4]};

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const RowAddWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

export const AddRowButton = styled.button`
  width: 100%;
  max-width: 100%;
  height: 40px;
  background: ${colors.gray[1]};
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  cursor: pointer;
  ${fonts.P3};
  text-align: center;

  &:hover {
    background: ${colors.blue.light3};
  }

  @media (max-width: 768px) {
    height: 36px;
    padding: 10px 0;
  }
`;

export const AddColumnButton = styled.button`
  width: 100%;
  height: 100%;
  background: ${colors.gray[2]};
  border: 2px dashed ${colors.gray[4]};
  border-radius: 6px;
  ${fonts.P4};
  color: ${colors.gray[4]};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${colors.blue.light4};
    color: ${colors.black};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const ErrorMessage = styled.input`
  color: ${colors.red[3]};
`;