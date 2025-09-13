import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const TopContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  margin: 2rem 0;
  padding: 0;
  box-sizing: border-box;
`;

export const Container = styled.div`
  width: 100%;
  background: ${theme.colors.white};
  border-radius: 12px;
  margin: 0;
  padding: 0 4rem;
  box-sizing: border-box;
`;

export const Title = styled.div`
  ${fonts.P4}
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

export const Explain = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

export const Row = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: nowrap;
  width: 100%;
  margin-top: 12px;
`;
