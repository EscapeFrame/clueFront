import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  padding: 2rem 8rem;
  background-color: ${theme.colors.white};
`;

export const TitleFont = styled.h1`
  ${fonts.P5}
  font-weight: 600;
  margin-bottom: 24px;
`;

export const AddButton = styled.button`
  background-color: ${theme.colors.blue[500]};
  border-radius: 6px;
  height: auto;
  cursor: pointer;
  width: 180px;
  height: 36px;
  border-width: 0;
  ${fonts.P2};
`;

export const Flexible = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ModalInput = styled.input`
  width: 100%;
  ${fonts.P2}
  border-radius: 8px;
  padding: 0.6rem 1rem;
  border: 1px solid ${theme.colors.gray[300]};
  outline: none;
`

export const ErrorMessage = styled.p`
color: ${theme.colors.red};
margin-bottom: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

export const CardTitle = styled.h2`
  ${fonts.P4}
  font-weight: 600;
  margin-bottom: 8px;
`;

export const CardDescription = styled.p`
  ${fonts.P2}
  color: ${theme.colors.gray[600]};
  margin-bottom: 12px;
`;

export const InfoBlock = styled.div`
  margin-bottom: 12px;
`;

export const InfoContent = styled.span`
  ${fonts.P2}
  color: ${theme.colors.gray[500]};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const EmptyMessage = styled.div`
  ${fonts.P2}
  color: ${theme.colors.gray[400]};
  text-align: center;
  margin-top: 48px;
`;