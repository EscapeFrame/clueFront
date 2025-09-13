import styled from "@emotion/styled";
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex; 
  align-items: center;
  gap: 16px; 
  padding: 24px 0; 
  border-bottom: 1px solid ${theme.colors.gray[300]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 0;
  }
`;

export const AvatarArea = styled.div`
  width: 80px; 
  height: 80px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const Avatar = styled.img`
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  object-fit: cover; 
  background: ${theme.colors.white};

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const AvatarFallback = styled.div`
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  background: ${theme.colors.gray[400]};

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const InfoArea = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 6px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const Name = styled.div`
  ${fonts.P3}; 
  font-weight: 700; 
  color: ${theme.colors.black};

  @media (max-width: 1200px) {
    ${fonts.P2};
  }

  @media (max-width: 768px) {
    ${fonts.P2};
    font-weight: 600;
  }
`;

export const SubText = styled.div`
  ${fonts.P2};
  color: ${theme.colors.gray[600]};

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;