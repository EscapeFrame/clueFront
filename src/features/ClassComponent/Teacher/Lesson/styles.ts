import styled from '@emotion/styled';
import { black, blue, white, gray } from '@/shared/styles/theme.styles';
import { fonts } from '@/shared/styles/font.styles';

export const Container = styled.div`
  margin: 0;
  padding: 0 10rem;
  display: flex;
  gap: 2rem;
  background-color: ${gray[100]};
  height: fit-content;
  min-height: 100%;
`;

export const LessonCardWrapper = styled.div`
  flex: 3;
`;

export const InfoBoardWrapper = styled.div`
  flex: 1;
`;

export const Body = styled.div``;

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
  ${fonts.P3}
  font-weight: 500;
  color: ${black};
  margin: 0;
`;

export const Count = styled.span`
  ${fonts.P2}
  color: ${gray[300]};
  border: none;
  user-select: none;
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

export const StatusIndicator = styled.div<{ read: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${blue[600]};
  color: ${white};
  visibility: ${({ read }) => (read ? 'visible' : 'hidden')};
`;

export const CheckIcon = styled.div`
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

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover button {
    opacity: 1;
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  color: ${gray[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
`;

export const TitleInput = styled.input`
  ${fonts.P2}
  padding: 0.25rem 0.5rem;
  border: 1px solid ${gray[200]};
  border-radius: 4px;
  width: 200px;
  margin-left: 0.5rem;

  &:focus {
    outline: none;
    border-color: ${blue[650]};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;