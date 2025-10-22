import { fonts } from '@/shared/theme/font.styles';
import styled from '@emotion/styled';
import {theme} from '@/shared/theme/theme.styles';

export const Container = styled.div`
  background: white;
  padding: 3rem 2rem;
  max-height: 100%;
  border-radius: 24px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 1rem;
  gap: 20px;
  margin-top: 12px;
  overflow-x: auto;          // 스크롤 가능
  padding-bottom: 10px; /* 스크롤바 공간 확보 */
`;

export const Title = styled.div`
  ${fonts.P5}
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P4};
  }
`;

export const Explain = styled.div`
  ${fonts.P2}
  color: ${theme.colors.gray[500]};
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P1};
  }
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