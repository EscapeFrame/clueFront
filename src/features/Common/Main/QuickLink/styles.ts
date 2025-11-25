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
    padding: 30px 4rem;
  }

  @media (max-width: 768px) {
    padding: 20px 2rem;
    grid-template-columns: 1fr;
    row-gap: 20px;
    margin-bottom: 2rem;
  }
`;

export const LinkContainer = styled.div`
  display: grid;
  grid-auto-flow: column;          /* 가로 방향으로만 흐르게 */
  grid-auto-columns: repeat(auto-fit, minmax(min-content, max-content));
  gap: 20px;
  overflow-x: auto;                /* 넘치면 스크롤 */
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;            /* 스크롤바와 내용물 간격 */

  @media (max-width: 768px) {
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 1fr);
    overflow-x: unset;
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
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;