import { fonts } from '@/shared/theme/font.styles';
import styled from '@emotion/styled';
import {theme} from '@/shared/theme/theme.styles';

export const Container = styled.div`
  background: ${theme.colors.blue[300]};
  padding: 30px 8rem;
  max-height: 100%;
  overflow: hidden;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-top: 12px;

  max-height: 280px;         // 고정 높이로 제한
  overflow-y: auto;          // 스크롤 가능
  padding-right: 4px;        // 스크롤바 공간 확보 (선택사항)
`;

export const Title = styled.div`
    ${fonts.P4}
    font-weight: 600;
`;

export const Explain = styled.div`
    display: 'flex';
    justifyContent: 'space-between';
    margin: 0;
    padding: 0;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 200px;
`;

export const LoadingText = styled.p`
  ${fonts.P1}
  color: ${theme.colors.gray[500]};
  margin: 0;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 200px;
  gap: 16px;
`;

export const ErrorText = styled.p`
  ${fonts.P1}
  color: ${theme.colors.red}
  margin: 0;
  text-align: center;
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  min-height: 200px;
`;

export const EmptyText = styled.p`
  ${fonts.P1}
  color: ${theme.colors.blue[500]};
  margin: 0;
  font-weight: 500;
`;