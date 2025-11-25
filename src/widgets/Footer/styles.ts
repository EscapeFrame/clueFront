import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  background: ${colors.gray[2]};
  height: auto;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 1000;

  @media (max-width: 1200px) {
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

export const LogoImg = styled.div`
  width: 120px;
  height: 60px;
  background-image: url('/paletto.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 1200px) {
    width: 100px;
    height: 50px;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 40px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  gap: 2rem;

  @media (max-width: 1200px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ItemList = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 36px;
  color: ${colors.gray[4]};

  @media (max-width: 1200px) {
    gap: 28px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const Item = styled.p`
  ${fonts.P2}
  font-weight: 600;

  @media (max-width: 1200px) {
    ${fonts.P3};
  }

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;