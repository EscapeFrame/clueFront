import styled from '@emotion/styled';
import { black, gray, blue, white } from '@/shared/styles/theme.styles';
import { fonts } from '@/shared/styles/font.styles';

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  background-color: ${white};
`;

export const CardContainer = styled.div`
  padding: 20px;
  border-radius: 16px;
  border: 1px solid ${gray[200]};
  height: 189px;
  background-color: ${white};
  cursor: pointer;
`;

export const CardHeader = styled.div`
  display: flex;
  margin-bottom: 0;
`;

export const Status = styled.p<{ active: boolean }>`
  padding: 5px 10px;
  border-radius: 12px;
  margin: 0;
  background-color: ${({ active }) => (active ? blue[500] : white)};
  border: ${({ active }) => (active ? 'none' : '2px solid ${blue[500]}')};
  color: ${black};
`;

export const CardTitle = styled.h2`
  margin: 10px 0;
  font-weight: 600;
`;

export const CardInfo = styled.p`
  color: ${gray[300]};
  margin: 5px 0;
  ${fonts.P2}
`;

export const ViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
`;

export const ManageButton = styled.div`
  background-color: ${white};
  border: 2px solid ${blue[500]};
  color: ${black};
  border-radius: 8px;
  padding: 5px 10px;
  width: 50%;
  text-align: center;
  ${fonts.P2}
  cursor: pointer;

  /* 세로 높이 조절 */
  line-height: 1.2;
  white-space: nowrap; /* 줄 바꿈 방지 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ViewButton = styled.div`
  background-color: ${blue[500]};
  color: ${black};
  border-radius: 8px;
  padding: 5px 10px;
  width: 50%;
  text-align: center;
  ${fonts.P2}
  cursor: pointer;

   /* 세로 높이 조절 */
  line-height: 1.2;
  white-space: nowrap; /* 줄 바꿈 방지 */
  display: flex;
  align-items: center;
  justify-content: center;
`;