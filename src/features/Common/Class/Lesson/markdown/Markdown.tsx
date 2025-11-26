import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import * as s from './styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/entities/Context/LoginContext';
import { getMarkDown } from '../../api/class/useMarkdown';
import { getLessonDirectories } from '@/features/Common/Class/api/useLesson';
import { IoListOutline } from 'react-icons/io5';
// import { IoChatbubbleOutline } from 'react-icons/io5';
// import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';

interface Document {
  documentId: number;
  title: string;
}

interface Directory {
  directoryId: number;
  directoryName: string;
  documentList?: Document[];
}

const Sidebar = () => {
  const { classRoomId, documentId } = useParams<{ classRoomId: string; documentId: string }>();
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [openDirs, setOpenDirs] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'curriculum' | 'chat' | 'question'>('curriculum');
  const navigate = useNavigate();

  useEffect(() => {
    if (!classRoomId) {
      console.log('[Sidebar] classRoomId가 없습니다.');
      return;
    }

    console.log('[Sidebar] 디렉토리 목록 로딩 시작:', classRoomId);
    getLessonDirectories(classRoomId)
      .then((res) => {
        console.log('[Sidebar] 디렉토리 목록 응답:', res);
        setDirectories(res.directoryList || []);
        // 첫 번째 디렉토리 자동 열기
        if (res.directoryList && res.directoryList.length > 0) {
          setOpenDirs(new Set([res.directoryList[0].directoryId]));
        }
      })
      .catch((err) => {
        console.error('[Sidebar] 디렉토리 목록 에러:', err);
        console.error('[Sidebar] 에러 상세:', {
          message: err.message,
          response: err.response,
          status: err.response?.status,
        });
        setDirectories([]);
      });
  }, [classRoomId, documentId]);

  const toggleDir = (dirId: number) => {
    setOpenDirs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dirId)) newSet.delete(dirId);
      else newSet.add(dirId);
      return newSet;
    });
  };

  return (
    <s.Sidebar>
      <s.TopTabs>
        <s.TabButton
          active={activeTab === 'curriculum'}
          onClick={() => setActiveTab('curriculum')}
        >
          <IoListOutline />
          <s.TopButton>커리큘럼</s.TopButton>
        </s.TabButton>
        {/* <s.TabButton 
          active={activeTab === 'chat'} 
          onClick={() => setActiveTab('chat')}
        >
          <IoChatbubbleOutline />
          <span>채팅</span>
        </s.TabButton>
        <s.TabButton 
          active={activeTab === 'question'} 
          onClick={() => setActiveTab('question')}
        >
          <AiOutlineQuestionCircle />
          <span>질문</span>
        </s.TabButton> */}
      </s.TopTabs>

      {activeTab === 'curriculum' && (
        <s.NavigationSection>
          {directories.map((dir) => (
            <div key={dir.directoryId}>
              <s.DirectoryItem onClick={() => toggleDir(dir.directoryId)}>
                <span>{dir.directoryName}</span>
                <s.ArrowIcon isOpen={openDirs.has(dir.directoryId)}>
                  <IoIosArrowDown />
                </s.ArrowIcon>
              </s.DirectoryItem>
              {openDirs.has(dir.directoryId) && dir.documentList && (
                <s.DocumentList>
                  {dir.documentList.map((doc: Document) => (
                    <s.DocumentItem
                      key={doc.documentId}
                      active={String(doc.documentId) === documentId}
                      onClick={() =>
                        navigate(`/class/${classRoomId}/${doc.documentId}`, {
                          state: { title: doc.title },
                        })
                      }
                    >
                      {doc.title}
                    </s.DocumentItem>
                  ))}
                </s.DocumentList>
              )}
            </div>
          ))}
        </s.NavigationSection>
      )}
    </s.Sidebar>
  );
};

export default function MarkDownViewerPage() {
  const { classRoomId, documentId } = useParams<{ classRoomId: string; documentId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [mdContent, setMdContent] = useState('Loading...');
  const [title, setTitle] = useState(location.state?.title || '문서');

  useEffect(() => {
    if (!documentId) {
      console.log('[Markdown] documentId가 없습니다.');
      return;
    }

    console.log('[Markdown] 문서 로딩 시작:', documentId);
    getMarkDown(documentId)
      .then((res) => {
        console.log('[Markdown] API 응답:', res);
        setMdContent(res.content || '');
        if (res.title) {
          setTitle(res.title);
        }
      })
      .catch((err) => {
        console.error('[Markdown] API 에러:', err);
        console.error('[Markdown] 에러 상세:', {
          message: err.message,
          response: err.response,
          status: err.response?.status,
        });
        setMdContent('마크다운을 불러오는데 실패했습니다.');
      });
  }, [documentId, classRoomId]);

  useEffect(() => {
    setTitle(location.state?.title || '문서');
  }, [location.state?.title]);

  const userCtx = useContext(UserContext);
  const isTeacher = !!userCtx?.user && userCtx.user.role === 'TEACHER';

  return (
    <s.PageWrapper>
      <Sidebar />
      <s.Container>
        <s.ViewerContainer>
          <s.ViewerHeader>
            <h1>{title}</h1>
          </s.ViewerHeader>
          <s.ViewerWrapper data-color-mode="light">
            <MDEditor.Markdown
              source={mdContent}
              style={{ fontSize: '18px', lineHeight: '1.8' }}
            />
          </s.ViewerWrapper>
        </s.ViewerContainer>
      </s.Container>

      {isTeacher && (
        <s.FloatingButton onClick={() => {
          if (!classRoomId || !documentId) {
            return;
          }
          navigate(`/class/${classRoomId}/${documentId}/quiz`);
        }}>
          Quiz 생성
        </s.FloatingButton>
      )}
    </s.PageWrapper>
  );
}