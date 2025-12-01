import { useEffect, useState, useRef, useCallback } from 'react';
import MDEditor from '@uiw/react-md-editor';

import * as s from './styles';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/entities/UI/Modal';
import { submitMarkDown } from '../api/useMarkDown';
import { useSetRecoilState } from 'recoil';
import { markdownSectionsState, MarkdownSection } from '@/shared/model/markdownState';
import { IoMdCloudUpload } from 'react-icons/io';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { MdLightbulbOutline, MdOutlineMenuBook } from 'react-icons/md';
import { HiOutlineExternalLink } from 'react-icons/hi';

// AI 피드백 데이터 타입
interface FeedbackItem {
  type: 'positive' | 'negative';
  message: string;
}

interface ImprovementSuggestion {
  message: string;
}

interface Reference {
  title: string;
  url?: string;
}

interface AIFeedback {
  feedback: FeedbackItem[];
  suggestions: ImprovementSuggestion[];
  references: Reference[];
}

// AI 피드백 컴포넌트 (백엔드 연결 전 임시 데이터)
const AIAgentView = ({ mdContent }: { mdContent: string }) => {
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);

  useEffect(() => {
    // TODO: 백엔드 API 연결
    // 임시 데이터
    setFeedback({
      feedback: [
        {
          type: 'positive',
          message: '문서의 전반적인 구조가 잘 짜여져 있습니다.',
        },
        {
          type: 'negative',
          message: '핵심 개념에 대한 설명이 충실하나, 실제 예시를 추가하면 이해도를 더 높일 수 있습니다.',
        },
      ],
      suggestions: [
        {
          message: "'이런부분'을 보니 각 섹션의 시작 부분에 요약문을 추가하여 독자가 내용을 미리 파악할 수 있도록 하는건 어떨까요?",
        },
        {
          message: '코드 예제나 다이어그램을 추가하면 복잡한 개념을 더 쉽게 전달할 수 있습니다.',
        },
        {
          message: '결론 부분에 핵심 내용을 정리하는 요약 섹션을 추가하는 것을 권장합니다.',
        },
      ],
      references: [
        { title: '효과적인 기술 문서 작성법' },
        { title: '마크다운 문법 완벽 가이드' },
        { title: '마크다운 문법 완벽 가이드' },
        { title: '마크다운 문법 완벽 가이드' },
        { title: '마크다운 문법 완벽 가이드' },
      ],
    });
  }, [mdContent]);

  // 로딩 상태는 현재 사용되지 않음

  if (!feedback) {
    return <div style={{ padding: '20px' }}>피드백이 없습니다.</div>;
  }

  return (
    <s.AIAgentContainer>
      <s.FeedbackCard>
        <s.CardHeader>
          <s.CardIcon bgColor="#E4F1FF">
            <AiOutlineCloseCircle style={{ color: '#86C1FF', fontSize: '20px' }} />
          </s.CardIcon>
          <s.CardTitle>피드백</s.CardTitle>
        </s.CardHeader>
        <s.FeedbackList>
          {feedback.feedback.map((item, index) => (
            <s.FeedbackItem key={index}>
              <s.FeedbackIcon>
                {item.type === 'positive' ? (
                  <AiOutlineCheckCircle style={{ color: '#86C1FF', fontSize: '20px' }} />
                ) : (
                  <AiOutlineCloseCircle style={{ color: '#FF6363', fontSize: '20px' }} />
                )}
              </s.FeedbackIcon>
              <s.FeedbackText>{item.message}</s.FeedbackText>
            </s.FeedbackItem>
          ))}
        </s.FeedbackList>
      </s.FeedbackCard>

      <s.SuggestionCard>
        <s.CardHeader>
          <s.CardIcon bgColor="#E4F1FF">
            <MdLightbulbOutline style={{ color: '#86C1FF', fontSize: '20px' }} />
          </s.CardIcon>
          <s.CardTitle>개선제안</s.CardTitle>
        </s.CardHeader>
        <s.SuggestionList>
          {feedback.suggestions.map((suggestion, index) => (
            <s.SuggestionItem key={index}>
              {index + 1}. {suggestion.message}
            </s.SuggestionItem>
          ))}
        </s.SuggestionList>
      </s.SuggestionCard>

      <s.ReferenceCard>
        <s.CardHeader>
          <s.CardIcon bgColor="#E4F1FF">
            <MdOutlineMenuBook style={{ color: '#86C1FF', fontSize: '20px' }} />
          </s.CardIcon>
          <s.CardTitle>참고자료</s.CardTitle>
        </s.CardHeader>
        <s.ReferenceList>
          {feedback.references.map((ref, index) => (
            <s.ReferenceItem key={index}>
              <s.ReferenceIcon>
                <HiOutlineExternalLink style={{ fontSize: '16px', color: '#666' }} />
              </s.ReferenceIcon>
              <s.ReferenceText>{ref.title}</s.ReferenceText>
            </s.ReferenceItem>
          ))}
        </s.ReferenceList>
      </s.ReferenceCard>
    </s.AIAgentContainer>
  );
};

export default function MarkDwonEditor({ classRoomId, directoryId }: { classRoomId: string, directoryId: string }) {
  const defaultTemplate = '# 마크다운을 작성해보세요\n\n## 제목\n- 목록 1\n- 목록 2\n\n**굵은 글씨**와 *기울임체*도 사용할 수 있습니다.';

  // 문자열에 리터럴 "\\n"이 들어있는 경우 실제 개행으로 변환
  const normalizeContent = (raw: string) => {
    if (!raw) return raw;
    // 이미 실제 줄바꿈이 포함되어 있으면 그대로 반환
    if (raw.includes('\n') && !raw.includes('\\n')) return raw;
    // 리터럴 "\\n" -> 실제 개행
    return raw.replace(/\\n/g, '\n');
  };

  // Enter 한 번으로 줄바꿈 되도록 처리 (마크다운 -> HTML 변환 시)
  const processLineBreaks = (markdown: string) => {
    if (!markdown) return markdown;
    
    // 코드 블록은 제외 (``` 사이의 내용)
    const codeBlockRegex = /```[\s\S]*?```/g;
    const codeBlocks: string[] = [];
    let processed = markdown.replace(codeBlockRegex, (match) => {
      codeBlocks.push(match);
      return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
    });

    // 단일 줄바꿈(\n)을 <br />로 변환 (연속된 줄바꿈은 제외)
    processed = processed.replace(/([^\n])\n([^\n])/g, '$1  \n$2');

    // 코드 블록 복원
    codeBlocks.forEach((block, i) => {
      processed = processed.replace(`___CODE_BLOCK_${i}___`, block);
    });

    return processed;
  };

  const [mdContent, setMdContent] = useState(() => normalizeContent(defaultTemplate));
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const editorRef = useRef<HTMLDivElement>(null);
  
  // 이미지 업로드된 파일들을 저장 (Base64 또는 Blob URL)
  const [uploadedImages, setUploadedImages] = useState<Map<string, string>>(new Map());
  
  // 드래그 오버 상태
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  
  // 업로드 중 상태
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  
  // setMarkdownSections은 문제 생성 기능과 연결될 예정입니다.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setMarkdownSections = useSetRecoilState(markdownSectionsState);

  // 모달 상태
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isPreviousOpen, setIsPreviousOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [viewerMode, setViewerMode] = useState<'preview' | 'aiAgent'>('preview');

  // 이미지를 Base64로 변환
  const convertImageToBase64 = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  // 클립보드에서 이미지 붙여넣기
  const handlePaste = useCallback(async (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    let imageProcessed = false;

    // 1. 먼저 이미지 파일 체크
    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        event.preventDefault();
        imageProcessed = true;
        const file = item.getAsFile();
        if (!file) continue;

        try {
          // Base64로 변환
          const base64 = await convertImageToBase64(file);
          const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          // 이미지 저장
          setUploadedImages(prev => new Map(prev).set(imageId, base64));
          
          // 마크다운에 이미지 삽입 (커스텀 문법 사용)
          const imageMarkdown = `![image](${imageId}){width=500}\n\n`;
          setMdContent(prev => prev + imageMarkdown);
          
          console.log('[Image] Pasted image from clipboard:', imageId);
        } catch (error) {
          console.error('[Image] Failed to process pasted image:', error);
          alert('이미지 붙여넣기에 실패했습니다.');
        }
      }
    }

    // 2. 이미지 파일이 없으면 HTML/텍스트에서 Base64 이미지 찾기
    if (!imageProcessed) {
      for (const item of Array.from(items)) {
        if (item.type === 'text/html' || item.type === 'text/plain') {
          item.getAsString((str) => {
            // Base64 이미지 패턴 찾기: data:image/...;base64,...
            const base64Pattern = /data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,([A-Za-z0-9+/=]+)/gi;
            const matches = [...str.matchAll(base64Pattern)];
            
            if (matches.length > 0) {
              event.preventDefault();
              matches.forEach((match) => {
                const fullBase64 = match[0]; // data:image/...;base64,...
                const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                
                // 이미지 저장
                setUploadedImages(prev => new Map(prev).set(imageId, fullBase64));
                
                // 마크다운에 이미지 삽입
                const imageMarkdown = `![image](${imageId}){width=500}\n\n`;
                setMdContent(prev => prev + imageMarkdown);
                
                console.log('[Image] Pasted Base64 image:', imageId);
              });
            }
          });
        }
      }
    }
  }, [convertImageToBase64]);

  // 붙여넣기 이벤트 리스너 등록
  useEffect(() => {
    const handlePasteEvent = (e: ClipboardEvent) => handlePaste(e);
    document.addEventListener('paste', handlePasteEvent);
    return () => document.removeEventListener('paste', handlePasteEvent);
  }, [handlePaste]);

  // 드래그 앤 드롭 이미지 업로드
  const handleDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingOver(false);

    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 업로드 시작
    setIsUploading(true);
    let uploadedCount = 0;

    try {
      for (const file of imageFiles) {
        uploadedCount++;
        setUploadProgress(`이미지 업로드 중... (${uploadedCount}/${imageFiles.length})`);
        
        try {
          const base64 = await convertImageToBase64(file);
          const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          // 이미지 저장
          setUploadedImages(prev => new Map(prev).set(imageId, base64));
          
          // 마크다운에 이미지 삽입 - Notion 스타일로 현재 커서 위치에 추가
          const imageMarkdown = `\n![${file.name.split('.')[0]}](${imageId}){width=500}\n`;
          setMdContent(prev => prev + imageMarkdown);
          
          console.log('[Image] Dropped image:', imageId, file.name);
          
          // 각 이미지 업로드 후 짧은 지연 (부드러운 UX)
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error('[Image] Failed to process dropped image:', error);
          alert(`이미지 업로드 실패: ${file.name}`);
        }
      }
      
      // 성공 메시지
      if (uploadedCount === imageFiles.length) {
        setUploadProgress(`✅ ${uploadedCount}개 이미지 업로드 완료!`);
        setTimeout(() => {
          setUploadProgress('');
          setIsUploading(false);
        }, 2000);
      }
    } catch (error) {
      console.error('[Image] Upload error:', error);
      setUploadProgress('');
      setIsUploading(false);
    }
  }, [convertImageToBase64]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // 실제로 영역을 벗어났는지 확인 (자식 요소 간 이동 무시)
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    
    if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
      setIsDraggingOver(false);
    }
  }, []);

  // 이미지 파일 선택 핸들러
  const handleImageFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 업로드 시작
    setIsUploading(true);
    let uploadedCount = 0;

    try {
      for (const file of imageFiles) {
        uploadedCount++;
        setUploadProgress(`이미지 업로드 중... (${uploadedCount}/${imageFiles.length})`);

        try {
          const base64 = await convertImageToBase64(file);
          const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          setUploadedImages(prev => new Map(prev).set(imageId, base64));
          
          const imageMarkdown = `\n![${file.name.split('.')[0]}](${imageId}){width=500}\n`;
          setMdContent(prev => prev + imageMarkdown);
          
          console.log('[Image] File selected:', imageId, file.name);
          
          // 각 이미지 업로드 후 짧은 지연
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error('[Image] Failed to process file:', error);
          alert(`이미지 업로드 실패: ${file.name}`);
        }
      }
      
      // 성공 메시지
      if (uploadedCount === imageFiles.length) {
        setUploadProgress(`✅ ${uploadedCount}개 이미지 업로드 완료!`);
        setTimeout(() => {
          setUploadProgress('');
          setIsUploading(false);
        }, 2000);
      }
    } catch (error) {
      console.error('[Image] Upload error:', error);
      setUploadProgress('');
      setIsUploading(false);
    }

    // input 초기화
    event.target.value = '';
  }, [convertImageToBase64]);

  // 마크다운 내용을 렌더링용으로 변환 (이미지 ID를 실제 Base64로 변환)
  const getPreviewContent = useCallback(() => {
    let content = mdContent;
    
    // 커스텀 이미지 문법 처리: ![alt](imageId){width=500}
    uploadedImages.forEach((base64, imageId) => {
      const regex = new RegExp(`!\\[([^\\]]*)\\]\\(${imageId}\\)(?:\\{width=(\\d+)\\})?`, 'g');
      content = content.replace(regex, (match, alt, width) => {
        const w = width || '500';
        // data-image-id 속성 추가하여 나중에 크기 조절 가능하도록
        return `<div class="resizable-image-wrapper" data-image-id="${imageId}" data-width="${w}" style="position: relative; display: inline-block; margin: 16px 0; user-select: none;">
          <img src="${base64}" alt="${alt}" style="width: ${w}px; max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: block;" draggable="false" />
          <div class="resize-handles" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0; transition: opacity 0.2s; pointer-events: none;">
            <div style="position: absolute; left: -8px; top: 0; width: 16px; height: 100%; cursor: ew-resize; display: flex; align-items: center; justify-content: center; pointer-events: auto;" data-handle="left">
              <div style="width: 4px; height: 40px; background: #4CAF50; border-radius: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
            </div>
            <div style="position: absolute; right: -8px; top: 0; width: 16px; height: 100%; cursor: ew-resize; display: flex; align-items: center; justify-content: center; pointer-events: auto;" data-handle="right">
              <div style="width: 4px; height: 40px; background: #4CAF50; border-radius: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>
            </div>
          </div>
          <div class="width-indicator" style="position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; opacity: 0; transition: opacity 0.2s; pointer-events: none; white-space: nowrap;">${w}px</div>
        </div>`;
      });
    });
    
    return content;
  }, [mdContent, uploadedImages]);

  // 미리보기에서 이미지 크기 조절 처리
  const handleImageResize = useCallback((imageId: string, newWidth: number) => {
    setMdContent(prev => {
      const regex = new RegExp(`(!\\[[^\\]]*\\]\\(${imageId}\\))(?:\\{width=\\d+\\})?`, 'g');
      return prev.replace(regex, `$1{width=${Math.round(newWidth)}}`);
    });
  }, []);

  // 미리보기 영역에 이미지 크기 조절 이벤트 리스너 추가
  useEffect(() => {
    let isResizing = false;
    let currentImageId: string | null = null;
    let startX = 0;
    let startWidth = 0;
    let handleSide: 'left' | 'right' = 'right';

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const handle = target.closest('[data-handle]') as HTMLElement;
      
      if (handle) {
        const handleType = handle.getAttribute('data-handle');
        if (handleType === 'left' || handleType === 'right') {
          e.preventDefault();
          isResizing = true;
          handleSide = handleType;
          startX = e.clientX;

          const wrapper = handle.closest('.resizable-image-wrapper') as HTMLElement;
          if (wrapper) {
            currentImageId = wrapper.getAttribute('data-image-id');
            const currentWidth = wrapper.getAttribute('data-width');
            startWidth = currentWidth ? parseInt(currentWidth) : 500;
            
            // Show width indicator
            const indicator = wrapper.querySelector('.width-indicator') as HTMLElement;
            if (indicator) indicator.style.opacity = '1';
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !currentImageId) return;

      const deltaX = e.clientX - startX;
      const direction = handleSide === 'right' ? 1 : -1;
      const newWidth = Math.max(100, Math.min(1200, startWidth + deltaX * direction));

      const wrapper = document.querySelector(`[data-image-id="${currentImageId}"]`) as HTMLElement;
      if (wrapper) {
        const img = wrapper.querySelector('img');
        const indicator = wrapper.querySelector('.width-indicator') as HTMLElement;
        if (img) {
          img.style.width = `${newWidth}px`;
          wrapper.setAttribute('data-width', String(newWidth));
        }
        if (indicator) {
          indicator.textContent = `${Math.round(newWidth)}px`;
        }
      }
    };

    const handleMouseUp = () => {
      if (isResizing && currentImageId) {
        const wrapper = document.querySelector(`[data-image-id="${currentImageId}"]`) as HTMLElement;
        if (wrapper) {
          const width = wrapper.getAttribute('data-width');
          if (width) {
            handleImageResize(currentImageId, parseInt(width));
          }
          
          // Hide width indicator
          const indicator = wrapper.querySelector('.width-indicator') as HTMLElement;
          if (indicator) {
            setTimeout(() => {
              indicator.style.opacity = '0';
            }, 1000);
          }
        }
      }
      isResizing = false;
      currentImageId = null;
    };

    const showHandles = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' && !isResizing) {
        const wrapper = target.closest('.resizable-image-wrapper');
        if (wrapper) {
          const handles = wrapper.querySelector('.resize-handles') as HTMLElement;
          if (handles) handles.style.opacity = '1';
        }
      }
    };

    const hideHandles = (e: MouseEvent) => {
      if (isResizing) return;
      
      const target = e.target as HTMLElement;
      const wrapper = target.closest('.resizable-image-wrapper');
      
      if (!wrapper) {
        document.querySelectorAll('.resize-handles').forEach(el => {
          (el as HTMLElement).style.opacity = '0';
        });
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', showHandles);
    document.addEventListener('mouseout', hideHandles);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', showHandles);
      document.removeEventListener('mouseout', hideHandles);
    };
  }, [handleImageResize]);

  // 마크다운에서 #으로 시작하는 대제목 파싱
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parseMarkdownSections = (content: string): MarkdownSection[] => {
    const sections: MarkdownSection[] = [];
    const lines = content.split('\n');
    let currentSection: MarkdownSection | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // #으로 시작하는 대제목 찾기
      if (line.trim().startsWith('# ')) {
        // 이전 섹션 저장
        if (currentSection) {
          sections.push(currentSection);
        }
        // 새 섹션 시작
        const title = line.trim().substring(2).trim();
        currentSection = {
          title,
          content: line + '\n',
        };
      } else if (currentSection) {
        // 현재 섹션에 내용 추가
        currentSection.content += line + '\n';
      }
    }

    // 마지막 섹션 저장
    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  };

  // (문제 생성 기능은 현재 사용되지 않음)

  // 파일 업로드 핸들러
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMdContent(normalizeContent(content));
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    // store previous value to restore later
    const prev = getComputedStyle(document.body).getPropertyValue('--app-top-offset');
    document.body.style.setProperty('--app-top-offset', '0px');
    return () => {
      if (prev) document.body.style.setProperty('--app-top-offset', prev);
      else document.body.style.removeProperty('--app-top-offset');
    };
  }, []);

  const endModal = () => {
    setIsEndOpen(true);
  }

  // 취소
  const cancel = () => {
    setIsCancelOpen(true);
  }

  // 이전 핸들러는 모달 내부에서 직접 navigate를 사용하므로 별도 함수가 필요하지 않습니다.

  // 완료
  const end = async () => {
    if (!title) {
      alert("제목을 입력해주세요!");
      return false
    }
    const file = new File([mdContent], 'markdown.md', { type: 'text/markdown' }); // text -> file
    console.log("file", file)
    const submissionData = {
      file: file,
      classRoomId: classRoomId,
      directoryId: directoryId,
      metadata: title,
    }
    try {
      await submitMarkDown(submissionData);
      console.log(file);
      setIsEndOpen(false);
      navigate(`/class/${classRoomId}`);
    } catch (error) {
      console.error("Markdown submission failed:", error);
      alert("마크다운 제출에 실패했습니다.");
      setIsEndOpen(false);
    }
  }

  return (
    <s.Container className="no-top-offset">
      <s.EditorSection>
        <s.EditorHeader>
          <s.SectionTitle
            placeholder='제목을 입력해주세요'
            value={title}
            onChange={(event) => setTitle(event.target.value)} />
          <s.HeaderButtons>
            <s.cancelButton onClick={cancel}>
              취소
            </s.cancelButton>
            <s.endButton onClick={endModal}>
              완료
            </s.endButton>
          </s.HeaderButtons>
        </s.EditorHeader>
        <s.FileUploadWrapper>
          <s.FileUploadButton>
            <input
              type="file"
              accept=".md,.markdown,text/markdown"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <IoMdCloudUpload style={{ marginRight: '8px' }} />
              파일 업로드
            </label>
          </s.FileUploadButton>
        </s.FileUploadWrapper>
        <s.EditorWrapper 
          data-color-mode="light"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          ref={editorRef}
          style={{
            position: 'relative',
            border: isDraggingOver ? '2px dashed #4CAF50' : '2px dashed transparent',
            backgroundColor: isDraggingOver ? 'rgba(76, 175, 80, 0.02)' : 'transparent',
            transition: 'all 0.2s ease',
          }}
        >
          {isDraggingOver && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              pointerEvents: 'none',
            }}>
              <div style={{
                padding: '20px 40px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                fontSize: '18px',
                fontWeight: 600,
                color: '#4CAF50',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <IoMdCloudUpload size={32} />
                이미지를 여기에 놓으세요
              </div>
            </div>
          )}
          {isUploading && uploadProgress && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '12px 24px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '14px',
              fontWeight: 500,
              color: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 1001,
              animation: 'slideIn 0.3s ease',
            }}>
              {uploadProgress.includes('✅') ? (
                <AiOutlineCheckCircle size={20} />
              ) : (
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #4CAF50',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
              )}
              {uploadProgress}
            </div>
          )}
          <MDEditor
            height="100%"
            value={processLineBreaks(mdContent)}
            autoFocus={true}
            style={{ whiteSpace: 'pre-wrap' }}
            onChange={(value: string | undefined) => {
              // 저장할 때는 원본 그대로 저장 (두 칸 공백 제거)
              const rawValue = value || '';
              const cleaned = rawValue.replace(/ {2}\n/g, '\n');
              setMdContent(normalizeContent(cleaned));
            }}
            preview="live"
            previewOptions={{
              rehypePlugins: [],
              components: {
                img: ({ ...props }) => {
                  // 커스텀 이미지 ID 체크
                  const src = props.src || '';
                  if (src.startsWith('img_')) {
                    const base64 = uploadedImages.get(src);
                    if (base64) {
                      return (
                        <img
                          {...props}
                          src={base64}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            margin: '16px 0',
                          }}
                          alt={props.alt || 'image'}
                        />
                      );
                    }
                  }
                  // 일반 이미지
                  return (
                    <img
                      {...props}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        margin: '16px 0',
                      }}
                    />
                  );
                },
              },
            }}
          />
        </s.EditorWrapper>
      </s.EditorSection>

      <s.ViewerSection>
        <s.ViewerHeader>
          <s.ToggleWrapper>
            <s.ToggleButton active={viewerMode === 'preview'} onClick={() => setViewerMode('preview')}>
              미리보기
            </s.ToggleButton>
          </s.ToggleWrapper>
          {viewerMode === 'preview' && (
            <s.FileUploadButton style={{ marginLeft: 'auto' }}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageFileSelect}
                style={{ display: 'none' }}
                id="preview-image-upload"
              />
              <label htmlFor="preview-image-upload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <IoMdCloudUpload style={{ marginRight: '8px' }} />
                이미지 업로드
              </label>
            </s.FileUploadButton>
          )}
        </s.ViewerHeader>
        {viewerMode === 'preview' ? (
          <s.ViewerWrapper 
            data-color-mode="light"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{
              position: 'relative',
              border: isDraggingOver ? '2px dashed #4CAF50' : '2px dashed transparent',
              backgroundColor: isDraggingOver ? 'rgba(76, 175, 80, 0.05)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            {isDraggingOver && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                pointerEvents: 'none',
                borderRadius: '8px',
              }}>
                <div style={{
                  padding: '20px 40px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#4CAF50',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <IoMdCloudUpload size={32} />
                  이미지를 여기에 놓으세요
                </div>
              </div>
            )}
            {isUploading && uploadProgress && (
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '12px 24px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#4CAF50',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                zIndex: 1001,
                animation: 'slideIn 0.3s ease',
              }}>
                {uploadProgress.includes('✅') ? (
                  <AiOutlineCheckCircle size={20} />
                ) : (
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #4CAF50',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                )}
                {uploadProgress}
              </div>
            )}
            <div style={{ 
              padding: '12px 20px', 
              backgroundColor: '#f0f7ff', 
              borderLeft: '4px solid #4CAF50',
              marginBottom: '20px',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#333'
            }}>
              💡 <strong>이미지 사용 팁:</strong> 이미지를 복사(Cmd+C)하여 붙여넣기(Cmd+V)하거나, 이곳에 드래그 앤 드롭하세요. 
              미리보기에서 이미지를 마우스로 드래그하여 크기를 조절할 수 있습니다.
            </div>
            <MDEditor.Markdown
              source={getPreviewContent()}
              style={{ padding: '20px', fontSize: '18px', lineHeight: '1.8' }}
            />
          </s.ViewerWrapper>
        ) : (
          <AIAgentView mdContent={mdContent} />
        )}
      </s.ViewerSection>
      {/* 취소 */}
      {isCancelOpen && (
        <Modal
          title="내용을 취소하시겠습니까?"
          onClose={() => setIsCancelOpen(false)}
          buttons={[
            {
              text: '확인',
              type: 0,
              onClick: () => {
                setMdContent(defaultTemplate);
                setIsCancelOpen(false);
                // 취소 확인 시 해당 클래스의 디렉터리로 이동
                navigate(`/class/${classRoomId}/${directoryId}`);
              },
            },
            { text: '닫기', type: 1, onClick: () => setIsCancelOpen(false) },
          ]}
        >
          화면을 나가겠습니까?
        </Modal>
      )}
      {/* 이전 */}
      {isPreviousOpen && (
        <Modal
          title="이전 페이지로 이동하시겠습니까?"
          onClose={() => setIsPreviousOpen(false)}
          buttons={[
            {
              text: '이동',
              type: 0,
              onClick: () => navigate(-1),
            },
            { text: '닫기', type: 1, onClick: () => setIsPreviousOpen(false) },
          ]}
        >
          작성 중인 내용은 저장되지 않습니다.
        </Modal>
      )}
      {/* 완료 */}
      {isEndOpen && (
        <Modal
          title="작성을 완료하시겠습니까?"
          onClose={() => setIsEndOpen(false)}
          buttons={[
            {
              text: '완료',
              type: 0,
              onClick: end,
            },
            { text: '닫기', type: 1, onClick: () => setIsEndOpen(false) },
          ]}
        >
          확인을 누르면 작성이 완료됩니다.
        </Modal>
      )}
    </s.Container>
  );
}
