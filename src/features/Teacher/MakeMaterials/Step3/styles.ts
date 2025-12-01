import styled from "styled-components";
import { colors } from "@/shared/theme/theme.styles";

export const Container = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  background: #f7f8fa;
  padding: 24px 0;
`;

export const Sidebar = styled.aside`
  width: 260px;
  flex-shrink: 0;
`;

export const SideBox = styled.div`
  background: #f9fafb;
`;

export const SideTitle = styled.div`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827; /* 짙은 검정 */
`;

export const MenuList = styled.ul`
  padding-left: 16px;
  list-style: none;

  li {
    margin-bottom: 10px;
    font-size: 15px;
    color: #6b7280; /* Gray-500 */
  }

  .active {
    font-weight: 600;
    color: #111827; /* 활성화 컬러 */
  }
`;

export const MenuButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? colors.primary : "transparent")};
  color: ${({ active }) => (active ? "white" : "#6B7280")};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  text-align: left;
  width: 100%;
  text-align: center;

  &:hover {
  background: ${({ active }) => (active ? colors.primary : colors.blue.light1)};
  color: ${({ active }) => (active ? 'white' : '#111827')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const Content = styled.div`
  background: white;
  padding: 24px;
  height: calc(100vh - 48px);
  border-radius: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const PageTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #111827; /* 제목 텍스트 */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  min-height: 0;
  height: 100%;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;

  label {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #111827;
  }

  input {
    padding: 12px 14px;
    border: 1px solid #d1d5db; /* Gray-300 */
    border-radius: 6px;
    font-size: 15px;
    background: white;

    &:focus {
      outline: none;
      border-color: #3b82f6; /* Blue-500 */
      box-shadow: 0 0 0 1px #3b82f6;
    }
  }
`;

export const TextAreaBox = styled.textarea`
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  outline: none;
  padding: 16px;

  box-sizing: border-box;
  width: 100%;
  flex: 1;
  min-height: 500px;
  font-size: 15px;
  line-height: 1.6;
  color: #1f2937;
  overflow: auto;
  white-space: pre-wrap;
  font-family: inherit;
  resize: none;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

export const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: #6b7280;
`;

export const SpinnerOverlay = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
  background: rgba(255,255,255,0.6); /* subtle light overlay */
`;

export const Spinner = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 6px solid rgba(37,99,235,0.12);
  border-top-color: rgba(37,99,235,0.9);
  animation: spin 1s cubic-bezier(.4,.0,.2,1) infinite;
  box-shadow: 0 6px 20px rgba(37,99,235,0.08);

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background: #2563EB;
    border-radius: 50%;
    box-shadow: 0 6px 18px rgba(37,99,235,0.18);
    animation: pulse 1.6s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0% { transform: translate(-50%, -50%) scale(0.9); opacity: .9; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: .65; }
    100% { transform: translate(-50%, -50%) scale(0.9); opacity: .9; }
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
  margin-top: auto; /* push to bottom */
  align-items: center;
  align-self: stretch;
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 12px 24px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  flex: 1; /* expand to fill available width */
  transition: background 0.2s ease;

  ${({ variant }) =>
    variant === "primary" &&
    `
      background: #2563EB; /* Blue-600 */
      color: white;

      &:hover { background: #1E4ED8; } /* Blue-700 */
    `};

  ${({ variant }) =>
    variant === "secondary" &&
    `
      background: white;
      border: 1px solid #D1D5DB;
      color: #374151;

      &:hover { background: #F3F4F6; }
    `};

  ${({ disabled }) =>
    disabled &&
    `
      opacity: .5;
      cursor: not-allowed;
    `}
`;

export const MBContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const MBContentWrapper = styled.div`
    width: 100%;
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    padding: 20px;
    position: relative;
    
    /* hover 시 힌트 표시 */
    &:hover .double-click-hint {
        opacity: 1;
    }
    
    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
        
        &:hover {
            background: #555;
        }
    }

    .wmde-markdown {
        background: white;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        word-wrap: break-word;
        word-break: break-word;
        overflow-wrap: break-word;
        
        h1, h2, h3, h4, h5, h6 {
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
            word-wrap: break-word;
        }
        
        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.25em; }
        
        p {
            margin-bottom: 0;
            line-height: 1.6;
            word-wrap: break-word;
        }
        
        code {
            background: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-size: 85%;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            word-wrap: break-word;
        }
        
        pre {
            background: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
            
            code {
                background: transparent;
                padding: 0;
                white-space: pre-wrap;
            }
        }
        
        ul, ol {
            padding-left: 2em;
            margin: 0;
            
            li {
                margin-bottom: 0;
                word-wrap: break-word;
            }
        }
        
        blockquote {
            border-left: 4px solid #dfe2e5;
            padding: 0 1em;
            color: #6a737d;
            margin: 0;
            word-wrap: break-word;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
            display: block;
            overflow-x: auto;
            
            th, td {
                border: 1px solid #dfe2e5;
                padding: 6px 13px;
                word-wrap: break-word;
            }
            
            th {
                background: #f6f8fa;
                font-weight: 600;
            }
        }
        
        a {
            color: #0366d6;
            text-decoration: none;
            word-wrap: break-word;
            
            &:hover {
                text-decoration: underline;
            }
        }
        
        img {
            max-width: 100%;
            height: auto;
        }
        
        hr {
            border: none;
            border-top: 2px solid #e1e4e8;
            margin: 12px 0;
        }
    }
`;

export const MBLineWrapper = styled.div<{ disabled?: boolean; lineType: string }>`
    padding: 4px 8px;
    margin: 2px 0;
    border-radius: 4px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s ease;
    min-height: ${props => props.lineType === 'empty' ? '24px' : 'auto'};
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    
    &:hover {
        ${props => !props.disabled && `
            background: #f8f9fa;
            border-left: 3px solid #4a90e2;
            padding-left: 5px;
        `}
    }
`;

export const MBMarkdownContent = styled.div`
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    user-select: none;
    
    * {
        user-select: none;
    }
`;

export const MBEditingLine = styled.div`
    margin: 2px 0;
`;

export const MBEditTextArea = styled.textarea`
    width: 100%;
    padding: 8px 12px;
    border: 2px solid #4a90e2;
    border-radius: 4px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    resize: none;
    min-height: 36px;
    max-height: 500px;
    overflow-y: auto;
    outline: none;
    box-shadow: 0 2px 8px rgba(74, 144, 226, 0.2);
    word-wrap: break-word;
    white-space: pre-wrap;
    
    &:focus {
        border-color: #2c5aa0;
    }
`;

export const MBEmptyLine = styled.div`
    height: 24px;
    opacity: 0.3;
`;

export const MBEmptyState = styled.div`
    padding: 40px;
    text-align: center;
    color: #999;
    font-size: 14px;
`;

export const MBDoubleClickHint = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(74, 144, 226, 0.9);
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
`;