import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  height: 100vh;
  padding: 20px;
  background-color: ${theme.colors.gray[200]};

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
`;

export const ViewerSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 95%;

  @media (max-width: 768px) {
    height: auto;
    min-height: 300px;
  }
`;

export const SectionTitle = styled.input`
  margin: 0;
  padding: 16px 20px;
  background: #f8f9fa;
  border: none;
  outline: none;
  border-bottom: 1px solid #e9ecef;
  ${fonts.P2};
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

export const ViewerWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;

  h1, h2, h3, h4, h5, h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  h1 { font-size: 2em; }
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.25em; }

  p {
    margin-bottom: 16px;
    line-height: 1.6;
  }

  ul, ol {
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
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
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