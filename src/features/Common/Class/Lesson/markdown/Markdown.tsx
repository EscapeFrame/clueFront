// MarkDownViewerPage.tsx

import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import * as s from './styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getMarkDown } from '../../api/class/useMarkdown';
import { getLessonDirectories as qre } from '@/features/Common/Class/api/useLesson';

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

const Sidebar = () => {
  const { classRoomId, documentId } = useParams<{ classRoomId: string; documentId: string }>();
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [openDirs, setOpenDirs] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    if (classRoomId) {
      qre(classRoomId).then((data: DirectoryResponse) => {
        setDirectories(data.directoryList || []);

        const currentDir = data.directoryList?.find((dir) =>
          dir.documentList?.some((doc) => String(doc.documentId) === documentId)
        );

        if (currentDir?.directoryId) {
          setOpenDirs((prev) => new Set(prev).add(currentDir.directoryId));
        }
      });
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
    <s.Sidebar>
      <s.SidebarTitle>커리큘럼</s.SidebarTitle>
      {directories.map((dir) => (
        <div key={dir.directoryId}>
          <s.DirectoryItem onClick={() => toggleDir(dir.directoryId)}>
            {dir.directoryName}
          </s.DirectoryItem>
          {openDirs.has(dir.directoryId) && dir.documentList && (
            <div>
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
            </div>
          )}
        </div>
      ))}
    </s.Sidebar>
  );
};

export default function MarkDownViewerPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const location = useLocation();
  const [mdContent, setMdContent] = useState('Loading...');
  const [title] = useState(location.state?.title || '');

  useEffect(() => {
    if (!documentId) return;

    const fetchMdData = async () => {
      try {
        const response = await getMarkDown(documentId);
        setMdContent(response);
      } catch (error: unknown) {
        console.error('Failed to fetch markdown:', error);
        setMdContent('# Error\n\nFailed to load document.');
      }
    };

    fetchMdData();
  }, [documentId]);

  return (
    <s.PageWrapper>
      <Sidebar />
      <s.Container>
        <s.ViewerContainer>
          <s.ViewerHeader>
            <h1>{title}</h1>
          </s.ViewerHeader>
          <s.ViewerWrapper data-color-mode="light">
            <MDEditor.Markdown source={mdContent} />
          </s.ViewerWrapper>
        </s.ViewerContainer>
      </s.Container>
    </s.PageWrapper>
  );
}