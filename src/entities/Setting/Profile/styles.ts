import styled from "@emotion/styled";
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex; 
  align-items: center;
  gap: 16px; 
  padding: 24px 0; 
  border-bottom: 1px solid ${theme.colors.gray[300]};
`;

export const AvatarArea = styled.div`
  width: 80px; 
  height: 80px;
`;

export const Avatar = styled.img`
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  object-fit: cover; 
  background: ${theme.colors.white};
`;

export const AvatarFallback = styled.div`
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  background: ${theme.colors.gray[400]};
`;

export const InfoArea = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 6px;
`;

export const Name = styled.div`
  ${fonts.P3}; 
  font-weight: 700; 
  color: #212529;
`;

export const SubText = styled.div`
  ${fonts.P2};
  color: #868e96;
`;