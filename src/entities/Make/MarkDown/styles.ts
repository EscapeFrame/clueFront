import styled from "@emotion/styled";
import { colors } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";
import { keyframes } from "@emotion/react";

// 애니메이션 정의
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export { spin, slideIn };

export const Container = styled.div`
  display: flex;
  height: calc(125vh);

  @media (max-width: 1200px) {
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 12px;
    padding: 12px;
  }

  &.no-top-offset {
    --app-top-offset: 0px;
  }
  
  /* 애니메이션을 전역으로 적용 */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const EditorSection = styled.div`
  padding: 0 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  overflow: hidden;
  height: 100%;
  border-right: 1px solid ${colors.gray[3]};

  @media (max-width: 768px) {
    height: auto;
    min-height: 300px;
  }
`;

export const ViewerSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;

  @media (max-width: 768px) {
    height: auto;
    min-height: 300px;
  }
`;

export const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${colors.gray[3]};
`;

export const SectionTitle = styled.input`
  margin: 0;
  border: none;
  outline: none;
  ${fonts.P5};
  font-weight: 600;
  color: ${colors.gray[4]};
  flex: 1;

  @media (max-width: 1200px) {
    ${fonts.P2};
  }

  @media (max-width: 768px) {
    ${fonts.P1};
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const FileUploadWrapper = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${colors.gray[3]};
`;

export const FileUploadButton = styled.div`
  label {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: ${colors.white};
    border: 1px solid ${colors.gray[3]};
    border-radius: 6px;
    cursor: pointer;
    ${fonts.P2};
    color: ${colors.black};
    transition: all 0.2s;

    &:hover {
      background-color: ${colors.gray[2]};
    }
  }
`;

export const BottomButtons = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid ${colors.gray[3]};
`;

export const GenerateProblemButton = styled.button`
  padding: 12px 24px;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  ${fonts.P3};
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.primary};
  }
`;

export const AIFeedbackButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 24px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[3]};
  border-radius: 6px;
  cursor: pointer;
  ${fonts.P3};
  color: ${colors.black};
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.gray[2]};
  }
`;

export const AIFeedbackDesc = styled.span`
  ${fonts.P1};
  color: ${colors.gray[4]};
  margin-top: 4px;
`;

export const previousButton = styled.div`
  margin-top: 10px;
  padding: 10px;
  color: ${colors.primary};
  cursor: pointer;

  @media (max-width: 768px) {
    ${fonts.P2};
    padding: 4px;
    padding-left: 24px;
  }
`;

export const cancelButton = styled.div`
  margin-top: 10px;
  padding: 10px;
  color: ${colors.primary};
  cursor: pointer;

  @media (max-width: 768px) {
    ${fonts.P2};
    padding: 4px;
    padding-left: 24px;
  }
`;

export const endButton = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: black;
  background-color: ${colors.primary};
  border-radius: 5px;
  cursor: pointer;
  padding-left: 30px;
  padding-right: 30px;

  @media (max-width: 1200px) {
    padding-left: 24px;
    padding-right: 24px;
    margin: 8px;
  }

  @media (max-width: 768px) {
    ${fonts.P2};
    padding: 8px 16px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

export const EditorWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  height: 100%;

  .w-md-editor {
    border: none;
    border-radius: 0;
  }

  .w-md-editor-content {
    border-radius: 0;
  }

  @media (max-width: 768px) {
    height: auto;
  }
  .w-md-editor .w-md-editor-toolbar {
    /* increased by ~20% from previous reduced sizes */
    min-height: 38px !important;
    height: 38px !important;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }

  .w-md-editor .w-md-editor-toolbar li > button,
  .w-md-editor .w-md-editor-toolbar button {
    /* increased by ~20% */
    padding: 6px 8px !important;
    height: 30px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 14px !important;
  }

  .w-md-editor .w-md-editor-toolbar li > button svg,
  .w-md-editor .w-md-editor-toolbar button svg {
    width: 17px !important;
    height: 17px !important;
  }
  
    /* 사용자 요청: 에디터 입력 및 코드 라인 폰트 크기 증가 */
    .w-md-editor-text-input,
    .w-md-editor-text-pre .code-line {
      font-size: 1.3rem !important; /* 원하는 크기로 조절 */
      line-height: 1.3rem !important; /* 줄 높이도 함께 조절 */
    }
    .w-md-editor-text-pre .code-line {
      display: block; /* line-height가 올바르게 적용되도록 설정 */
    }
`;

export const SaveWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 0;
    flex-direction: column;
    gap: 8px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const ViewerWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.25em;
  }

  p {
    margin-bottom: 16px;
    line-height: 1.6;
  }

  ul,
  ol {
    margin-bottom: 16px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 8px;
  }

  code {
    background-color: #f1f3f4;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    ${fonts.P2};
  }

  pre {
    background-color: #f6f8fa;
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
    margin-bottom: 16px;
  }

  blockquote {
    border-left: 4px solid #dfe2e5;
    margin: 0 0 16px 0;
    padding-left: 16px;
    color: #6a737d;
  }

  @media (max-width: 1200px) {
    padding: 16px;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const ViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-bottom: 0;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.gray[3]};
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid
    ${({ active }) => (active ? colors.primary : colors.white)};
  color: ${({ active }) =>
    active ? colors.black : colors.gray[4]};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: -1px;
  ${fonts.P2};

  &:focus {
    outline: none;
  }
`;

// AI Agent View Styles
export const AIAgentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FeedbackCard = styled.div`
  background: ${colors.white};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const SuggestionCard = styled.div`
  background: ${colors.white};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const ReferenceCard = styled.div`
  background: ${colors.white};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const CardIcon = styled.div<{ bgColor: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.h3`
  ${fonts.P3};
  font-weight: 600;
  color: ${colors.black};
  margin: 0;
`;

export const FeedbackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FeedbackItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const FeedbackIcon = styled.div`
  flex-shrink: 0;
`;

export const FeedbackText = styled.p`
  ${fonts.P2};
  color: ${colors.black};
  margin: 0;
  line-height: 1.6;
`;

export const SuggestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SuggestionItem = styled.div`
  ${fonts.P2};
  color: ${colors.black};
  line-height: 1.6;
`;

export const ReferenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ReferenceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.gray[2]};
  }
`;

export const ReferenceIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const ReferenceText = styled.span`
  ${fonts.P2};
  color: ${colors.black};
`;
