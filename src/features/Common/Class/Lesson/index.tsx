import { memo, useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoClose } from "react-icons/io5";

import * as s from './styles';

import { Directory, LessonProps, SubDirectory } from '@/shared/types/Class/Lesson';
import { getLessonDirectories } from '../api';
import { useRecoilValue } from 'recoil';
import { userState } from '@/shared/model/userState';
import DirectorySelect from '@/entities/Make/Lesson/directory/DirectorySelect';
import { deleteDirectory, deleteDocument, Directory as ApiDirectory } from '@/entities/Make/api/useLesson';
import ToggleSwitch from '@/entities/UI/ToggleSwitch';

// UI state: editingDocId, visibilityMap used below

interface SubItemProps {
  sub: SubDirectory;
  dirId: string;
  isTeacher: boolean;
  isEditing: boolean;
  vis: 'PRIVATE' | 'PUBLIC';
  onDragStart: (e: React.DragEvent, parentDirId: string, docId: string) => void;
  onDragEnd: () => void;
  onNameDoubleClick: (e: React.MouseEvent, sub: SubDirectory) => void;
  onNameClick: (e: React.MouseEvent, sub: SubDirectory) => void;
  onTitleChange: (docId: string, newTitle: string) => void;
  onTitleBlur: () => void;
  onToggleVisibility: (docId: string) => void;
  onDeleteDocument: (docId: string, e: React.MouseEvent) => void;
}

const SubItem = memo(({
  sub,
  dirId,
  isTeacher,
  isEditing,
  vis,
  onDragStart,
  onDragEnd,
  onNameDoubleClick,
  onNameClick,
  onTitleChange,
  onTitleBlur,
  onToggleVisibility,
  onDeleteDocument,
}: SubItemProps) => (
  <s.SubItem
    key={sub.id}
    $isRead={sub.isRead}
    draggable
    onDragStart={(e) => onDragStart(e, dirId, sub.id)}
    onDragEnd={onDragEnd}
  >
    <s.Check $isRead={sub.isRead} />

    {isEditing ? (
      <input
        autoFocus={true}
        style={{ width: 360, height: 36, fontSize: 14, padding: '6px 8px' }}
        value={sub.name}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onTitleChange(sub.id, e.target.value)}
        onBlur={onTitleBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
    ) : (
      <s.Name
        onDoubleClick={(e) => onNameDoubleClick(e, sub)}
        onClick={(e) => onNameClick(e, sub)}
      >
        {sub.name}
      </s.Name>
    )}

    {isTeacher && (
      <>
        <ToggleSwitch
          id={`vis-${sub.id}`}
          checked={vis === 'PUBLIC'}
          onChange={() => { onToggleVisibility(sub.id); }}
        />

        <s.DeleteIcon onClick={(e) => { e.stopPropagation(); onDeleteDocument(sub.id, e); }}>
          <IoClose size={18} />
        </s.DeleteIcon>
      </>
    )}
  </s.SubItem>
));

interface DirectoryItemProps {
  dir: Directory;
  isExpanded: boolean;
  isTeacher: boolean;
  editingDocId: string | null;
  visibilityMap: Record<string, 'PRIVATE' | 'PUBLIC'>;
  onDirectoryClick: (dir: Directory, isSubDirectory?: boolean) => void;
  onDeleteDirectory: (dirId: string, e: React.MouseEvent) => void;
  onAddSubClick: (dirId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDropToDir: (e: React.DragEvent, targetDirId: string) => void;
  onSubDragStart: (e: React.DragEvent, parentDirId: string, docId: string) => void;
  onSubDragEnd: () => void;
  onNameDoubleClick: (e: React.MouseEvent, sub: SubDirectory) => void;
  onNameClick: (e: React.MouseEvent, sub: SubDirectory) => void;
  onTitleChange: (docId: string, newTitle: string) => void;
  onTitleBlur: () => void;
  onToggleVisibility: (docId: string) => void;
  onDeleteDocument: (docId: string, e: React.MouseEvent) => void;
}

const DirectoryItem = memo(({
  dir,
  isExpanded,
  isTeacher,
  editingDocId,
  visibilityMap,
  onDirectoryClick,
  onDeleteDirectory,
  onAddSubClick,
  onDragOver,
  onDropToDir,
  onSubDragStart,
  onSubDragEnd,
  onNameDoubleClick,
  onNameClick,
  onTitleChange,
  onTitleBlur,
  onToggleVisibility,
  onDeleteDocument,
}: DirectoryItemProps) => {
  const readCount = dir.directoryList?.filter(d => d.isRead).length ?? 0;
  const totalCount = dir.directoryList?.length ?? 0;
  const progress = totalCount > 0 ? (readCount / totalCount) * 100 : 0;

  return (
    <s.DirectoryWrapper key={dir.id}>
      <s.Item $isRead={dir.isRead} onClick={() => onDirectoryClick(dir)}>
        <s.Left>
          <s.Name>{dir.name}</s.Name>
          <s.Progress>{readCount}/{totalCount}</s.Progress>
        </s.Left>
        <s.Right>
          {isTeacher && (
            <>
              <s.DeleteIcon onClick={(e) => { e.stopPropagation(); onDeleteDirectory(dir.id, e); }}>
                <IoClose size={18} />
              </s.DeleteIcon>
              <s.AddSub onClick={(e) => {
                e.stopPropagation();
                onAddSubClick(dir.id);
              }}>+</s.AddSub>
            </>
          )}
          <s.Icon>{isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}</s.Icon>
        </s.Right>
      </s.Item>

      <s.ProgressBarWrapper>
        <s.ProgressBar $progress={progress} />
        <s.ProgressText>{Math.round(progress)}%</s.ProgressText>
      </s.ProgressBarWrapper>

      <s.SubDirectoryList
        $isExpanded={isExpanded}
        onDragOver={onDragOver}
        onDrop={(e) => onDropToDir(e, dir.id)}
      >
        {dir.directoryList?.map((sub) => (
          <SubItem
            key={sub.id}
            sub={sub}
            dirId={dir.id}
            isTeacher={isTeacher}
            isEditing={editingDocId === sub.id}
            vis={visibilityMap[sub.id] ?? 'PUBLIC'}
            onDragStart={onSubDragStart}
            onDragEnd={onSubDragEnd}
            onNameDoubleClick={onNameDoubleClick}
            onNameClick={onNameClick}
            onTitleChange={onTitleChange}
            onTitleBlur={onTitleBlur}
            onToggleVisibility={onToggleVisibility}
            onDeleteDocument={onDeleteDocument}
          />
        ))}
      </s.SubDirectoryList>
    </s.DirectoryWrapper>
  );
});

const LessonComponent: React.FC<LessonProps> = ({ classRoomId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAIFlowMode = searchParams.get('mode') === 'ai-flow';
  const user = useRecoilValue(userState);

  const [directories, setDirectories] = useState<Directory[]>([]);
  // buffer for pending patch updates: documentId -> partial payload
  const [pendingPatch, setPendingPatch] = useState<Record<string, Partial<{ directoryId: string; isPrivate: string; title: string }>>>({});
  const patchInFlight = useRef<Record<string, boolean>>({});
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [visibilityMap, setVisibilityMap] = useState<Record<string, 'PRIVATE' | 'PUBLIC'>>({});
  const [code, setCode] = useState("코드를 불러오지 못했습니다.")
  // local class code (fallback to prop `code`)
  const [localCode, setLocalCode] = useState<string>(code ?? '');
  const [loading, setLoading] = useState(true);
  // inline add flow: show DirectorySelect inline when true
  const [isAddingDir, setIsAddingDir] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // retained for delete/document refresh

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const isTeacher = !!user && (user.role === 'TEACHER');
  const [copiedTitle, setCopiedTitle] = useState<string>('');
  // 짧은 복사 피드백용 타이머
  useEffect(() => {
    if (!copiedTitle) return;
    const t = setTimeout(() => setCopiedTitle(''), 1500);
    return () => clearTimeout(t);
  }, [copiedTitle]);

  // 데이터 불러오기
  const fetchData = useCallback(async () => {
    try {
      const classInfo = await getLessonDirectories(classRoomId);
      if (classInfo.directoryList) {
        sessionStorage.setItem(`lessonDirectories-${classRoomId}`, JSON.stringify(classInfo.directoryList));
      }

      setCode(classInfo.code);
      const visMap: Record<string, 'PRIVATE' | 'PUBLIC'> = {};
      const normalizeDocType = (t: unknown): SubDirectory['type'] => {
        const allowed = ['markdown', 'ppt', 'code', 'docs'] as const;
        if (typeof t === 'string' && (allowed as readonly string[]).includes(t)) return t as SubDirectory['type'];
        return 'docs';
      };

      const dirs: Directory[] = classInfo.directoryList.map((dir) => ({
        id: dir.directoryId.toString(),
        name: dir.directoryName,
        isRead: false,
        directoryList: dir.documentList.map(doc => {
          type DocumentLike = { documentId?: string; id?: string; title?: string; name?: string; type?: unknown; isPrivate?: string };
          const d = doc as unknown as DocumentLike;
          const isPriv = (d.isPrivate as string | undefined) ?? 'PUBLIC';
          visMap[String(d.documentId ?? d.id ?? '')] = (isPriv === 'PRIVATE' ? 'PRIVATE' : 'PUBLIC');
          return {
            id: d.documentId ?? d.id ?? '',
            name: d.title ?? d.name ?? '',
            isRead: false,
            type: normalizeDocType(d.type),
          } as SubDirectory;
        }),
      }));
      setDirectories(dirs);
      setVisibilityMap(visMap);
      // API may return a class code; prefer that if prop `code` is not provided
      if (classInfo.code) {
        setLocalCode(classInfo.code);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [classRoomId]);

  useEffect(() => {
    if (classRoomId) {
      fetchData();
    }
  }, [fetchData, classRoomId, refreshTrigger]);

  const toggleDirectory = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDirectoryClick = (dir: Directory, isSubDirectory: boolean = false) => {
    if (isSubDirectory) {
      setDirectories(prev =>
        prev.map(d => {
          if (d.directoryList) {
            const newSubDirs = d.directoryList.map(sd =>
              sd.id === dir.id ? { ...sd, isRead: true } : sd
            );
            const allSubRead = newSubDirs.every(sd => sd.isRead);
            return { ...d, directoryList: newSubDirs, isRead: allSubRead };
          }
          return d;
        })
      );
      navigate(`/class/${classRoomId}/${dir.id}`, { state: { title: dir.name } });
    } else {
      toggleDirectory(dir.id);
    }
  };

  // Drag & Drop: start
  const dragSource = useRef<{ dirId: string; docId: string } | null>(null);
  const isDraggingRef = useRef(false);
  const clickTimerRef = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent, parentDirId: string, docId: string) => {
    dragSource.current = { dirId: parentDirId, docId };
    e.dataTransfer.effectAllowed = 'move';
    isDraggingRef.current = true;
  };

  const handleDragEnd = () => {
    dragSource.current = null;
    // small timeout to allow drop to process
    setTimeout(() => { isDraggingRef.current = false; }, 50);
  };

  const handleNameClick = (e: React.MouseEvent, sub: SubDirectory) => {
    e.stopPropagation();
    // delay navigation to allow double-click detection
    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    clickTimerRef.current = window.setTimeout(() => {
      if (!isDraggingRef.current) {
        handleDirectoryClick(sub, true);
      }
      clickTimerRef.current = null;
    }, 200);
  };

  const handleNameDoubleClick = (e: React.MouseEvent, sub: SubDirectory) => {
    e.stopPropagation();
    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    if (isTeacher) setEditingDocId(sub.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropToDir = useCallback((e: React.DragEvent, targetDirId: string) => {
    e.preventDefault();
    const src = dragSource.current;
    if (!src) return;
    if (src.dirId === targetDirId) return; // no-op

    setDirectories(prev => {
      const copy = prev.map(d => ({ ...d, directoryList: d.directoryList ? d.directoryList.map(sd => ({ ...sd })) : [] }));
      // find and remove from source
      const srcDir = copy.find(d => d.id === src.dirId);
      const targetDir = copy.find(d => d.id === targetDirId);
      if (!srcDir || !targetDir) return prev;
      const docIndex = srcDir.directoryList?.findIndex(sd => sd.id === src.docId) ?? -1;
      if (docIndex === -1) return prev;
      const [moved] = srcDir.directoryList!.splice(docIndex, 1);
      targetDir.directoryList = targetDir.directoryList ?? [];
      targetDir.directoryList.unshift(moved);

      // mark moved as not read in new dir context
      moved.isRead = moved.isRead ?? false;

      // enqueue PATCH for moved document's directoryId change
      // assemble full payload: directoryId, isPrivate, title
      const title = moved.name;
      const isPriv = visibilityMap[moved.id] ?? 'PUBLIC';
      setPendingPatch(prevPending => ({
        ...prevPending,
        [moved.id]: { ...(prevPending[moved.id] ?? {}), directoryId: targetDirId, isPrivate: isPriv, title },
      }));

      return copy;
    });
    dragSource.current = null;
  }, [visibilityMap]);
  // Drag & Drop: end

  const handleCodeSelect = () => {
    const copyText = localCode || code || '';
    navigator.clipboard.writeText(copyText)
      .then(() => {
        setCopiedTitle(copyText);
        alert('수업 코드가 클립보드에 복사되었습니다.');
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
        alert('코드 복사에 실패했습니다.');
      });
  };

  const handleDirectoryAdded = (newDir?: ApiDirectory | null) => {
    if (newDir) {
      // API의 응답 형태에 따라 변환 (안전한 접근)
      const nd = newDir as unknown as Record<string, unknown>;
      const idVal = nd.directoryId ?? nd.id ?? '';
      const nameVal = (nd.directoryName ?? nd.name) as string | undefined;
      const docList = (nd.documentList as unknown) as Array<Record<string, unknown>> | undefined;
      const dir = {
        id: String(idVal ?? ''),
        name: nameVal ?? '새 디렉토리',
        isRead: false,
        directoryList: (docList ?? []).map(doc => {
          const docId = String(doc.documentId ?? doc.id ?? '');
          const docName = String(doc.title ?? doc.name ?? '');
          const docType = (doc.type as string) ?? undefined;
          return {
            id: docId,
            name: docName,
            isRead: false,
            type: (docType as 'markdown' | 'ppt' | 'code' | 'docs') ?? 'docs',
          };
        }),
      };
  setDirectories(prev => [dir as Directory, ...prev]);
    } else {
      setRefreshTrigger(prev => prev + 1);
    }
  };

  // Send PATCH requests for pendingPatch entries. useEffect watches pendingPatch and fires per-item.
  useEffect(() => {
    const entries = Object.entries(pendingPatch);
    if (entries.length === 0) return;

    entries.forEach(async ([docId, payload]) => {
      if (!payload) return;
      if (patchInFlight.current[docId]) return; // already sending
      patchInFlight.current[docId] = true;
        try {
          // Build body according to API shape
          const body: Record<string, string> = {};
          if (payload.directoryId !== undefined) body.directoryId = String(payload.directoryId);
          if (payload.isPrivate !== undefined) body.isPrivate = String(payload.isPrivate);
          if (payload.title !== undefined) body.title = String(payload.title);

          const res = await fetch(`/api/document/${encodeURIComponent(docId)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
        if (!res.ok) {
          console.error('PATCH failed for document', docId, await res.text());
        }
      } catch (err) {
        console.error('Error patching document', docId, err);
      } finally {
        // mark done and remove pending for this doc
        patchInFlight.current[docId] = false;
        setPendingPatch(prev => {
          const copy = { ...prev };
          delete copy[docId];
          return copy;
        });
      }
    });
  }, [pendingPatch]);

  // inline title edit handled via handleNameDoubleClick

  const handleTitleChange = useCallback((docId: string, newTitle: string) => {
  // only update UI locally while editing; do NOT enqueue PATCH for every keystroke
  setDirectories(prev => prev.map(d => ({ ...d, directoryList: d.directoryList?.map(sd => sd.id === docId ? { ...sd, name: newTitle } : sd) })));
  }, []);

  const handleTitleBlur = () => {
    // when editing ends, send a single PATCH with full payload (directoryId, isPrivate, title)
    if (!editingDocId) return setEditingDocId(null);
    const docId = editingDocId;

    // find current directoryId and isPrivate for this doc
    let currentDirectoryId: string | undefined;
    let currentIsPrivate: 'PRIVATE' | 'PUBLIC' = 'PUBLIC';
    for (const d of directories) {
      if (d.directoryList?.some(sd => sd.id === docId)) {
        currentDirectoryId = d.id;
        break;
      }
    }
    currentIsPrivate = visibilityMap[docId] ?? 'PUBLIC';

    // find current title from directories state
    const currentTitle = directories.flatMap(d => d.directoryList ?? []).find(sd => sd.id === docId)?.name ?? '';

    // always send full shape
    setPendingPatch(prev => ({ ...prev, [docId]: { directoryId: currentDirectoryId ?? '', isPrivate: currentIsPrivate, title: currentTitle } }));

    setEditingDocId(null);
  };

  // visibility toggle
  const toggleVisibility = (docId: string) => {
    // determine current directory and title
    let currentDirectoryId: string | undefined;
    for (const d of directories) {
      if (d.directoryList?.some(sd => sd.id === docId)) {
        currentDirectoryId = d.id;
        break;
      }
    }
    const currentTitle = directories.flatMap(d => d.directoryList ?? []).find(sd => sd.id === docId)?.name ?? '';

    setVisibilityMap(prev => {
      const cur = prev[docId] ?? 'PUBLIC';
      const next = cur === 'PRIVATE' ? 'PUBLIC' : 'PRIVATE';
      // enqueue patch with full payload
      setPendingPatch(p => ({ ...p, [docId]: { ...(p[docId] ?? {}), directoryId: currentDirectoryId ?? '', isPrivate: next, title: currentTitle } }));
      return { ...prev, [docId]: next };
    });
  };

  if (loading) return <s.Container>수업 정보를 불러오는 중...</s.Container>;

  const handleDeleteDirectory = async (dirId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // 선생님이 아니면 삭제 불가
    if (!isTeacher) {
      alert("선생님만 디렉토리를 삭제할 수 있습니다.");
      return;
    }
    if (window.confirm("정말로 이 디렉토리를 삭제하시겠습니까?")) {
      try {
        const success = await deleteDirectory(dirId);
        console.log(success);
        if (success) {
          setRefreshTrigger(prev => prev + 1);
        }
        else {
          alert("디렉토리 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("디렉토리 삭제 실패:", error);
        alert("디렉토리 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDeleteDocument = async (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // 선생님이 아니면 삭제 불가
    if (!isTeacher) {
      alert("선생님만 문서를 삭제할 수 있습니다.");
      return;
    }
    if (window.confirm("정말로 이 문서 삭제하시겠습니까?")) {
      try {
        const success = await deleteDocument(docId);
        console.log(success);
        if (success) {
          setRefreshTrigger(prev => prev + 1);
        }
        else {
          alert("문서 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("문서 삭제 실패:", error);
        alert("문서 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleAddSubClick = (dirId: string) => {
    if (isAIFlowMode) {
      navigate(`${dirId}/make/lesson/MakeClassMaterials`);
      return;
    }
    navigate(`${dirId}/make/lesson`);
  };

  return (
    <s.Container>
      {isTeacher && (
        <s.SectionHeader>
          <s.LeftGroup>
            <s.Description>※ 디렉토리 제목 클릭 시 수정 가능합니다.</s.Description>
          </s.LeftGroup>
          <s.RightGroup>
            <s.SettingButton onClick={() => navigate("setting")}>학습실 관리</s.SettingButton>
            <s.CardContainer onClick={handleCodeSelect}>
              <s.CardTitle>수업코드</s.CardTitle>
              <s.CardText>{(copiedTitle || localCode || code) ?? "알 수 없음"}</s.CardText>
            </s.CardContainer>
          </s.RightGroup>
        </s.SectionHeader>
      )}

      <s.Section>
        {directories.map((dir) => (
          <DirectoryItem
            key={dir.id}
            dir={dir}
            isExpanded={expandedIds.has(dir.id)}
            isTeacher={isTeacher}
            editingDocId={editingDocId}
            visibilityMap={visibilityMap}
            onDirectoryClick={handleDirectoryClick}
            onDeleteDirectory={handleDeleteDirectory}
            onAddSubClick={handleAddSubClick}
            onDragOver={handleDragOver}
            onDropToDir={handleDropToDir}
            onSubDragStart={handleDragStart}
            onSubDragEnd={handleDragEnd}
            onNameDoubleClick={handleNameDoubleClick}
            onNameClick={handleNameClick}
            onTitleChange={handleTitleChange}
            onTitleBlur={handleTitleBlur}
            onToggleVisibility={toggleVisibility}
            onDeleteDocument={handleDeleteDocument}
          />
        ))}
      </s.Section>
      {/* 선생님만 디렉토리 추가 가능: 인라인으로 DirectorySelect 사용 */}
      {isTeacher && !isAIFlowMode && (
        <>
          {!isAddingDir && (
            <s.AddButton onClick={() => setIsAddingDir(true)}>
              + 새 디렉토리 만들기
            </s.AddButton>
          )}

          {isAddingDir && (
            <DirectorySelect
              classRoomId={classRoomId}
              initialOpen={true}
              onDirectoryAdded={(newDir) => {
                handleDirectoryAdded(newDir);
                setIsAddingDir(false);
              }}
            />
          )}
        </>
      )}

    </s.Container>
  );
};

export default LessonComponent;
