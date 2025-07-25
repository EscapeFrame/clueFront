import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  padding: 30px 8rem;
  display: grid;
  width: 100%;
  box-sizing: border-box;
`;

export const LinkContainer = styled.div`
  display: grid;
  grid-auto-flow: column;          /* 가로 방향으로만 흐르게 */
  grid-auto-columns: repeat(auto-fit, minmax(min-content, max-content));
  gap: 20px;
  overflow-x: auto;                /* 넘치면 스크롤 */
  width: 100%;
  box-sizing: border-box;
`;

export const Link = styled.a`
  margin-top: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 250px;
  text-decoration: none;
  color: ${theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const LogoBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(135, 135, 135, 0.7), transparent);
    pointer-events: none;
  }
`;

export const TextOverImage = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 1;
  ${fonts.P2}
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