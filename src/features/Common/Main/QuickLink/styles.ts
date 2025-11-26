import styled from '@emotion/styled';
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  padding: 3rem 2rem;
  display: grid;
  width: 100%;
  box-sizing: border-box;
  background: ${colors.white};
  border-radius: 24px;
  margin-bottom: 6rem;
  gap: 16px;

  @media (max-width: 1200px) {
    padding: 2.5rem 1.5rem;
    margin-bottom: 4rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    margin-bottom: 2rem;
    border-radius: 16px;
  }
`;

export const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

export const Link = styled.a`
  margin-top: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  text-decoration: none;
  color: ${colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  transition: transform 180ms ease, box-shadow 180ms ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 768px) {
    min-height: 200px;
  }

  @media (max-width: 480px) {
    min-height: 180px;
    margin-top: 0;
    
    &:hover,
    &:focus-visible {
      transform: translateY(-4px) scale(1.01);
    }
  }
`;

export const LogoBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
    display: block;
    transition: transform 160ms ease, object-position 160ms ease;
  padding: 8px; /* 작은 내부 여백을 줘서 이미지가 모서리에 붙어 잘리는 현상 완화 */
  box-sizing: border-box;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
    pointer-events: none;
  }
`;

export const TextOverImage = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 1;
  ${fonts.P2}
  color: black;

  @media (max-width: 768px) {
    ${fonts.P3}
    bottom: 12px;
    right: 12px;
  }

  @media (max-width: 480px) {
    bottom: 8px;
    right: 8px;
  }
`;

export const Title = styled.div`
  ${fonts.P5}
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    ${fonts.P4}
  }

  @media (max-width: 480px) {
    ${fonts.P3}
  }
`;

export const Explain = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;