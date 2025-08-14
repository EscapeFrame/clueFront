import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  padding: 20px;
  background-color: #f8f9fa;
`;

export const EditorSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ViewerSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  padding: 16px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  font-size: 16px;
  font-weight: 600;
  color: #495057;
`;

export const EditorWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  
  .w-md-editor {
    border: none;
    border-radius: 0;
  }
  
  .w-md-editor-content {
    border-radius: 0;
  }
`;

export const ViewerWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  
  /* 마크다운 스타일 커스터마이징 */
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
    font-size: 0.9em;
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
`; 