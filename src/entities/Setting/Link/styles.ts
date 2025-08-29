import styled from "@emotion/styled";
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const LinkItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f5;
  cursor: pointer;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  ${fonts.P4};
  color: ${theme.colors.black};
`;

export const Body = styled.div`
  ${fonts.P2};
  color: ${theme.colors.gray[600]};
`;
