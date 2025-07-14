import { fonts } from '@/shared/styles/font.styles';
import { blue, gray, white } from '@/shared/styles/theme.styles';
import styled from '@emotion/styled';

export const TitleFont = styled.div`
  ${fonts.P3}
  font-weight: 600;
  border-bottom: 1px solid ${gray[200]};
`;

export const NoticeWrapper = styled.div`
  border: 1px solid ${gray[200]};
  border-radius: 8px;
  padding: 24px;
  background-color: ${white};
`;

export const NoticeList = styled.ul`
  list-style: none; /* 리스트 마커 제거 */
  margin: 0;
  padding: 0;
`;

export const NoticeItem = styled.li`
  display: flex;
  justify-content: space-between; /* 타이틀과 날짜를 양 끝에 배치 */
  align-items: center;
  padding-top: 0.5rem;
`;

export const NoticeTitleButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  ${fonts.P2}
  text-align: left;
  cursor: pointer;
  flex: 1; 
  white-space: nowrap; /* 타이틀이 너무 길어지면 줄바꿈 없이 말줄임 처리 */
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

export const NoticeDate = styled.span`
  ${fonts.P1}
  color: ${gray[300]};
  margin-left: 12px;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${white};
  padding: 1.5rem 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
`;

export const ModalTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const ModalDate = styled.p`
  color: ${gray[300]};
  ${fonts.P1}
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
`;

export const ModalDescription = styled.p`
  font-size: 1rem;
  color: #111;
  white-space: pre-wrap;
`;

export const CloseButton = styled.button`
  margin-top: 1rem;
  background-color: ${blue[500]};
  color: ${white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${blue[600]};
  }
`;
