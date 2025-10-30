import styled from "@emotion/styled";
import { blue, theme } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";

export const Container = styled.div`
  display: flex;
  height: 100vh;

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
`;

export const EditorSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white};
  overflow: hidden;
  height: 100%;
  border-right: 1px solid ${theme.colors.gray[300]};

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

export const SectionTitle = styled.input`
  margin: 0;
  padding: 24px 20px 16px 20px;
  border: none;
  outline: none;
  ${fonts.P5};
  font-weight: 600;
  color: #495057;

  @media (max-width: 1200px) {
    ${fonts.P2};
    padding: 12px 16px;
  }

  @media (max-width: 768px) {
    ${fonts.P1};
    padding: 10px 14px;
  }
`;

export const previousButton = styled.div`
  margin-top: 10px;
  padding: 10px;
  color: ${blue[500]};
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
  color: ${blue[500]};
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
  background-color: ${blue[500]};
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
  border-bottom: 1px solid ${theme.colors.gray[300]};
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid
    ${({ active }) => (active ? theme.colors.blue[500] : "white")};
  color: ${({ active, theme }) =>
    active ? theme.colors.black : theme.colors.gray[500]};
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
