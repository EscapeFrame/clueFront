import styled from "@emotion/styled";
import { black, gray, white, blue } from "@/shared/styles/theme.styles";
import { fonts } from "@/shared/styles/font.styles";

export const LessonPageContainer = styled.div``;
export const ContentContainer = styled.div`
  margin: 0;
  padding: 0 10rem;
  display: flex;
  gap: 2rem;
  background-color:${gray[100]};
  height: fit-content;
  min-height: 100%;
`;

export const LessonCardWrapper = styled.div`
  flex: 3;
`;

export const InfoBoardWrapper = styled.div`
  flex: 1;
`;

// LessonCard
import { FaCheck } from 'react-icons/fa6';
export const Body = styled.div`
  width: 100%;
`;

export const LessonSection = styled.div`
  margin-top: 16px;
  border: 1px solid ${gray[200]};
  border-radius: 8px;
  overflow: hidden;
`;

export const SectionHeader = styled.button`
  width: 100%;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${white};
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  ${fonts.P3};
  font-weight: 600;
  color: ${black};
  margin: 0;
`;

export const SectionItems = styled.div`
  border-top: 1px solid ${gray[200]};
  padding: 10px 20px;
  background-color: ${white};
`;

export const LessonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

export const StatusIndicator = styled.div<{ isRead: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${blue[500]};
  color: #fff;
  visibility: ${({ isRead }) => (isRead ? 'visible' : 'hidden')};
`;

export const CheckIcon = styled(FaCheck)`
  width: 1rem;
  height: 1rem;
`;

export const LessonButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  font-size: 1rem;
  color: ${black};
  text-align: left;
  cursor: pointer;
  transition: color 0.2s ease;
`;
