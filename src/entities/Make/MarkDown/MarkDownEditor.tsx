import { useEffect, useState } from 'react';
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

  const [mdContent, setMdContent] = useState(() => normalizeContent(defaultTemplate));
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  // setMarkdownSections은 문제 생성 기능과 연결될 예정입니다.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setMarkdownSections = useSetRecoilState(markdownSectionsState);

  // 모달 상태
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isPreviousOpen, setIsPreviousOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [viewerMode, setViewerMode] = useState<'preview' | 'aiAgent'>('preview');

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
        <s.EditorWrapper data-color-mode="light">
          <MDEditor
            height="200%"
            value={mdContent}
            autoFocus={true}
            style={{ whiteSpace: 'pre-wrap' }}
            onChange={(value: string | undefined) => setMdContent(normalizeContent(value || ''))}
            preview="edit"
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
        </s.ViewerHeader>
        {viewerMode === 'preview' ? (
          <s.ViewerWrapper data-color-mode="light">
            <MDEditor.Markdown
              source={mdContent}
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
