import styled from '@emotion/styled';
import { black, blue, gray, white } from '@/shared/styles/theme.styles';
import { fonts } from '@/shared/styles/font.styles'; 

export const InquiryWrapper = styled.div`
  border: 1px solid ${gray[200]}
  border-radius: 8px;
  padding: 16px;
  margin: 0;
  background-color: ${white};
`;

export const TitleFont = styled.h2`
  ${fonts.P3}
  font-weight: 600;
  border-bottom: 1px solid ${gray[200]};
  padding-bottom: 0.5rem;
  margin: 0 0 1rem 0;
`;

export const InquiryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const InquiryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0.5rem 0;
`;

export const InquiryTitleButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  ${fonts.P2}
  text-align: left;
  cursor: pointer;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

export const StudentId = styled.span`
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
  background-color: white;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
`;

export const ModalTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const ModalStudentId = styled.p`
  color: ${gray[300]};
  ${fonts.P1}
  margin: 0 0 1rem 0;
`;

export const ModalDescription = styled.p`
  font-size: 1rem;
  color: ${black};
  white-space: pre-wrap;
`;

export const CloseButton = styled.button`
  margin-top: 1rem;
  background-color: ${blue[600]};
  color: ${white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${blue[650]};
  }
`;