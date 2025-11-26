import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import * as s from './styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/entities/Context/LoginContext';
import { getDocumentInfo, downloadDocumentAsBlob } from '../../api/class/useMarkdown';
import { getLessonDirectories as qre } from '@/features/Common/Class/api/useLesson';
import { IoListOutline } from 'react-icons/io5';
// import { IoChatbubbleOutline } from 'react-icons/io5';
// import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Document {
  documentId: number;
  title: string;
}

interface Directory {
  directoryId: number;
  directoryName: string;
  documentList?: Document[];
}

interface DirectoryResponse {
  directoryList: Directory[];
}

const Sidebar = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  const { classRoomId, documentId } = useParams<{ classRoomId: string; documentId: string }>();
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [openDirs, setOpenDirs] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'curriculum' | 'chat' | 'question'>('curriculum');
  const navigate = useNavigate();

  useEffect(() => {
    if (classRoomId) {
      const cachedDirectories = sessionStorage.getItem(`lessonDirectories-${classRoomId}`);

      const processDirectories = (directoryList: Directory[]) => {
        setDirectories(directoryList || []);
        const currentDir = directoryList?.find((dir) =>
          dir.documentList?.some((doc) => String(doc.documentId) === documentId));

        if (currentDir?.directoryId) {
          setOpenDirs((prev) => new Set(prev).add(currentDir.directoryId));
        }
      };

      if (cachedDirectories) {
        try {
          const parsedData = JSON.parse(cachedDirectories);
          processDirectories(parsedData);
        } catch (e) {
          console.error("Failed to parse cached directories", e);
          // 파싱 실패 시 API 호출
          qre(classRoomId).then((data: DirectoryResponse) => {
            sessionStorage.setItem(`lessonDirectories-${classRoomId}`, JSON.stringify(data.directoryList || []));
            processDirectories(data.directoryList);
          });
        }
      } else {
        qre(classRoomId).then((data: DirectoryResponse) => {
          sessionStorage.setItem(`lessonDirectories-${classRoomId}`, JSON.stringify(data.directoryList || []));
          processDirectories(data.directoryList);
        });
      }
    }
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
    <s.Sidebar isOpen={isOpen}>
      <s.TopTabs>
        <s.TabButton 
          active={activeTab === 'curriculum'} 
          onClick={() => setActiveTab('curriculum')}
        >
          <IoListOutline />
          <span>커리큘럼</span>
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!documentId) return;

    const fetchMdData = async () => {
      try {
        // 먼저 파일 정보 확인
        const info = await getDocumentInfo(documentId);
        
        // 파일명에서 확장자 확인
        const filename = info.filename || title || `document_${documentId}`;
        const fileExtension = filename.toLowerCase().split('.').pop();
        
        // 다운로드 대상 확장자 목록
        const downloadableExtensions = ['png', 'jpg', 'jpeg', 'gif', 'pdf', 'zip', 'rar', 'docx', 'xlsx', 'pptx', 'doc', 'xls', 'ppt', 'txt', 'csv'];
        
        // 다운로드 대상 파일인 경우
        if (fileExtension && downloadableExtensions.includes(fileExtension)) {
          // Blob으로 다운로드 처리
          const result = await downloadDocumentAsBlob(documentId);
          
          if (result) {
            // Blob을 다운로드
            const url = window.URL.createObjectURL(result.blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = result.filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            
            setMdContent('# 파일 다운로드\n\n파일이 다운로드되었습니다.');
            // 다운로드 후 이전 페이지로 돌아가기
            setTimeout(() => {
              navigate(-1);
            }, 500);
          } else {
            setMdContent('# Error\n\n파일 다운로드에 실패했습니다.');
          }
        } else {
          // 마크다운 또는 기타 텍스트 파일로 렌더링
          const content = typeof info.data === 'string' ? info.data : String(info.data);
          setMdContent(content);
        }
      } catch (error: unknown) {
        console.error('Failed to fetch markdown:', error);
        setMdContent('# Error\n\nFailed to load document.');
      }
    };

    fetchMdData();
  }, [documentId, title, navigate]);

  useEffect(() => {
    setTitle(location.state?.title || '문서');
  }, [location.state?.title]);

  const userCtx = useContext(UserContext);
  const isTeacher = !!userCtx?.user && userCtx.user.role === 'TEACHER';

  return (
    <s.PageWrapper>
      <s.SidebarToggleButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} isOpen={isSidebarOpen}>
        {isSidebarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </s.SidebarToggleButton>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
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