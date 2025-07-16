import styled from '@emotion/styled'
import { black, gray, white } from '@/shared/styles/theme.styles'
import { fonts } from '@/shared/styles/font.styles'

export const Container = styled.div`
width: 100% !important;
  padding: 0 10rem;
  display: flex;
  flex-direction: column;  /* 가로 배열에서 세로 배열로 변경 */
  gap: 2rem;
  background-color: ${white};
  height: fit-content;
  min-height: 100%;
`;

export const Card = styled.div<{ clickable: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1rem 1.5rem;
  margin: 1rem 0;

  background-color: ${white};
  border-radius: 12px;
  border: 1px solid #ccc;
  box-shadow: none;

  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'not-allowed')};
  opacity: ${({ clickable }) => (clickable ? 1 : 0.6)};
  user-select: none;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ clickable }) => (clickable ? gray[200] : white)};
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

export const Title = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  color: ${black};
  font-family: ${fonts.P2};
  text-align: left;
`

export const DateText = styled.span`
  color: ${gray[400]};
  font-size: 1rem;
  white-space: nowrap;
  text-align: left;
`

export const CountdownText = styled.span`
  font-size: 0.9rem;
  color: ${gray[300]};
  min-width: 180px;
  text-align: right;
`