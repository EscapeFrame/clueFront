import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import * as s from './styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/entities/Context/LoginContext';
import { downloadDocumentAsBlob } from '../../api/class/useMarkdown';
import { getLessonDirectories as qre } from '@/features/Common/Class/api/useLesson';
import { IoListOutline } from 'react-icons/io5';
// import { IoChatbubbleOutline } from 'react-icons/io5';
// import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdDownload } from 'react-icons/md';

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

const Sidebar = ({ isOpen }: { isOpen: boolean; onToggle: () => void }) => {
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
  const [viewerType, setViewerType] = useState<'markdown' | 'image' | 'pdf' | 'docviewer' | 'loading'>('loading');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileExtension, setFileExtension] = useState<string>('');

  useEffect(() => {
    if (!documentId) return;

    const fetchMdData = async () => {
      try {
        console.log('[Markdown] Fetching document:', documentId);
        
        // Blob 데이터 다운로드
        const result = await downloadDocumentAsBlob(documentId);
        
        if (!result) {
          console.error('[Markdown] Failed to download document');
          setMdContent('# Error\n\n파일을 불러오는데 실패했습니다.');
          setViewerType('markdown');
          return;
        }
        
        console.log('[Markdown] Blob result:', result);
        console.log('[Markdown] Filename:', result.filename);
        console.log('[Markdown] Blob type:', result.blob.type);
        console.log('[Markdown] Blob size:', result.blob.size);
        console.log('[Markdown] Content-Type:', result.contentType);
        
        // 파일명에서 확장자 확인
        const filename = result.filename || title || `document_${documentId}`;
        const filenameParts = filename.toLowerCase().split('.');
        const ext = filenameParts.length > 1 ? filenameParts.pop() || '' : '';
        setFileExtension(ext);
        
        console.log('[Markdown] Filename:', filename);
        console.log('[Markdown] Extension from filename:', ext);
        
        // Content-Type에서 파일 타입 확인
        const contentType = result.contentType || result.blob.type || '';
        console.log('[Markdown] Content-Type for detection:', contentType);
        
        // Content-Type으로 파일 타입 결정
        let isImage = false;
        let isPdf = false;
        let isOffice = false;
        let isText = false;
        let isDownloadOnly = false;
        
        // 1. Content-Type으로 먼저 판단
        if (contentType.startsWith('image/')) {
          isImage = true;
        } else if (contentType === 'application/pdf') {
          isPdf = true;
        } else if (
          contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          contentType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
          contentType === 'application/msword' ||
          contentType === 'application/vnd.ms-excel' ||
          contentType === 'application/vnd.ms-powerpoint'
        ) {
          isOffice = true;
        } else if (contentType.startsWith('text/') || contentType === 'application/json') {
          isText = true;
        } else if (
          contentType === 'application/zip' ||
          contentType === 'application/x-rar-compressed' ||
          contentType === 'application/x-7z-compressed' ||
          contentType === 'application/x-tar' ||
          contentType === 'application/gzip'
        ) {
          isDownloadOnly = true;
        }
        
        // 2. Content-Type으로 판단 안되면 확장자로 판단
        if (!isImage && !isPdf && !isOffice && !isText && !isDownloadOnly && ext) {
          const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'];
          const pdfExtensions = ['pdf'];
          const officeExtensions = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
          const textExtensions = ['md', 'markdown', 'txt'];
          const downloadOnlyExtensions = ['zip', 'rar', '7z', 'tar', 'gz'];
          
          isImage = imageExtensions.includes(ext);
          isPdf = pdfExtensions.includes(ext);
          isOffice = officeExtensions.includes(ext);
          isText = textExtensions.includes(ext);
          isDownloadOnly = downloadOnlyExtensions.includes(ext);
        }
        
        console.log('[Markdown] File type check:', { isImage, isPdf, isOffice, isText, isDownloadOnly });
        
        // Blob URL 생성 - Blob 타입 확인 및 수정
        let blobToUse = result.blob;
        
        // Blob의 타입이 비어있거나 generic한 경우, Content-Type으로 새 Blob 생성
        if (result.contentType && (!result.blob.type || result.blob.type === 'application/octet-stream')) {
          console.log('[Markdown] Creating new Blob with correct type:', result.contentType);
          blobToUse = new Blob([result.blob], { type: result.contentType });
          console.log('[Markdown] New Blob type:', blobToUse.type);
        }
        
        const blobUrl = window.URL.createObjectURL(blobToUse);
        setFileUrl(blobUrl);
        console.log('[Markdown] Blob URL created:', blobUrl);
        
        if (isText) {
          // 마크다운 또는 텍스트 파일로 렌더링
          console.log('[Markdown] Rendering as markdown/text');
          const text = await result.blob.text();
          console.log('[Markdown] Content length:', text.length);
          setMdContent(text);
          setViewerType('markdown');
        } else if (isImage) {
          // 이미지로 표시
          console.log('[Markdown] Rendering as image');
          setViewerType('image');
        } else if (isPdf) {
          // PDF로 표시
          console.log('[Markdown] Rendering as PDF');
          setViewerType('pdf');
        } else if (isOffice) {
          // Office 문서 - DocViewer 사용
          console.log('[Markdown] Rendering with DocViewer');
          setViewerType('docviewer');
        } else if (isDownloadOnly) {
          // 다운로드만 가능한 파일
          console.log('[Markdown] Starting download...');
          
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = result.filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          
          console.log('[Markdown] File downloaded:', result.filename);
          setMdContent('# 파일 다운로드\n\n파일이 다운로드되었습니다.');
          setViewerType('markdown');
          // 다운로드 후 이전 페이지로 돌아가기
          setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
            navigate(-1);
          }, 500);
        } else {
          // 기타 파일은 텍스트로 시도
          console.log('[Markdown] Rendering as text (fallback)');
          try {
            const text = await result.blob.text();
            setMdContent(text);
            setViewerType('markdown');
          } catch (e) {
            console.error('[Markdown] Failed to read as text:', e);
            setMdContent('# 알 수 없는 파일 형식\n\n이 파일을 표시할 수 없습니다. 다운로드하시겠습니까?');
            setViewerType('markdown');
          }
        }
      } catch (error: unknown) {
        console.error('[Markdown] Failed to fetch document:', error);
        setMdContent('# Error\n\nFailed to load document.');
        setViewerType('markdown');
      }
    };

    fetchMdData();
    
    // Cleanup: Blob URL 해제
    return () => {
      if (fileUrl) {
        window.URL.revokeObjectURL(fileUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId, title, navigate]);

  useEffect(() => {
    setTitle(location.state?.title || '문서');
  }, [location.state?.title]);

  const userCtx = useContext(UserContext);
  const isTeacher = !!userCtx?.user && userCtx.user.role === 'TEACHER';

  const handleDownload = () => {
    if (!fileUrl || !title) return;
    
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = title;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

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
            {(viewerType === 'image' || viewerType === 'pdf' || viewerType === 'docviewer') && fileUrl && (
              <button
                onClick={handleDownload}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                <MdDownload size={18} />
                다운로드
              </button>
            )}
          </s.ViewerHeader>
          <s.ViewerWrapper data-color-mode="light">
            {viewerType === 'loading' && (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading...</p>
              </div>
            )}
            {viewerType === 'markdown' && (
              <MDEditor.Markdown
                source={mdContent}
                style={{ fontSize: '18px', lineHeight: '1.8' }}
              />
            )}
            {viewerType === 'image' && fileUrl && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                padding: '20px',
                minHeight: '400px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }}>
                <img 
                  src={fileUrl} 
                  alt={title}
                  onError={(e) => {
                    console.error('[Markdown] Image failed to load');
                    console.error('[Markdown] Image src:', fileUrl);
                    console.error('[Markdown] Error:', e);
                  }}
                  onLoad={() => {
                    console.log('[Markdown] Image loaded successfully');
                  }}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '80vh',
                    height: 'auto',
                    objectFit: 'contain',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
            )}
            {viewerType === 'pdf' && fileUrl && (
              <div style={{ width: '100%', height: '85vh' }}>
                <iframe
                  src={fileUrl}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                    borderRadius: '8px'
                  }}
                  title={title}
                />
              </div>
            )}
            {viewerType === 'docviewer' && fileUrl && (
              <div style={{ width: '100%', height: '85vh', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '14px' }}>
                  💡 Office 문서는 브라우저에서 직접 미리보기가 제한될 수 있습니다. 다운로드 버튼을 눌러 파일을 다운로드하세요.
                </div>
                <DocViewer
                  documents={[{ uri: fileUrl, fileType: fileExtension }]}
                  pluginRenderers={DocViewerRenderers}
                  config={{
                    header: {
                      disableHeader: false,
                      disableFileName: false,
                    },
                  }}
                  style={{ height: 'calc(100% - 60px)' }}
                />
              </div>
            )}
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