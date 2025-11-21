import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoDocumentOutline } from "react-icons/io5";
import { IoCodeSlashOutline } from "react-icons/io5";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { LuHash } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

import * as s from './styles';

import { Directory, LessonProps } from '@/shared/types/Class/Lesson';
import { getLessonDirectories } from '../api';
import { useRecoilValue } from 'recoil';
import { userState } from '@/shared/model/userState';
import DirectorySelect from '@/entities/Make/Lesson/directory/DirectorySelect';
import { deleteDirectory, deleteDocument, Directory as ApiDirectory } from '@/entities/Make/api/useLesson';

const LessonComponent: React.FC<LessonProps> = ({ classRoomId }) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const [directories, setDirectories] = useState<Directory[]>([]);
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

      setCode(classInfo.code)
      const dirs: Directory[] = classInfo.directoryList.map((dir) => ({
        id: dir.directoryId.toString(),
        name: dir.directoryName,
        isRead: false,
        directoryList: dir.documentList.map(doc => ({
          id: doc.documentId,
          name: doc.title,
          isRead: false,
          type: doc.type as 'markdown' | 'ppt' | 'code' | 'docs',
        })),
      }));
      setDirectories(dirs);
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
      // API의 응답 형태에 따라 변환
      const dir = {
        id: String((newDir as any).directoryId ?? (newDir as any).id ?? (newDir.id ?? '')),
        name: (newDir as any).directoryName ?? (newDir as any).name ?? (newDir.name ?? '새 디렉토리'),
        isRead: false,
        directoryList: (newDir as any).documentList?.map((doc: any) => ({
          id: String(doc.documentId ?? doc.id),
          name: doc.title ?? doc.name,
          isRead: false,
          type: doc.type as 'markdown' | 'ppt' | 'code' | 'docs',
        })) ?? [],
      };
      setDirectories(prev => [dir, ...prev]);
    } else {
      setRefreshTrigger(prev => prev + 1);
    }
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

  return (
    <s.Container>
      <s.SectionHeader>
        <s.LeftGroup>
          <s.Description>※ 디렉토리 제목 클릭 시 수정 가능합니다.</s.Description>
        </s.LeftGroup>
        <s.RightGroup>
          {isTeacher && (
            <>
              <s.SettingButton onClick={() => navigate("setting")}>학습실 관리</s.SettingButton>
              <s.CardContainer onClick={handleCodeSelect}>
                <s.CardTitle>수업코드</s.CardTitle>
                <s.CardText>{(copiedTitle || localCode || code) ?? "알 수 없음"}</s.CardText>
              </s.CardContainer>
            </>
          )}
        </s.RightGroup>
      </s.SectionHeader>

      <s.Section>
        {directories.map((dir) => {
          const isExpanded = expandedIds.has(dir.id);
          const readCount = dir.directoryList?.filter(d => d.isRead).length ?? 0;
          const totalCount = dir.directoryList?.length ?? 0;
          const progress = totalCount > 0 ? (readCount / totalCount) * 100 : 0;

          return (
            <s.DirectoryWrapper key={dir.id}>
              <s.Item $isRead={dir.isRead} onClick={() => handleDirectoryClick(dir)}>
                <s.Left>
                  <s.Name>{dir.name}</s.Name>
                  <s.Progress>{readCount}/{totalCount}</s.Progress>
                </s.Left>
                <s.Right>
                  {isTeacher && (
                    <>
                      <s.DeleteIcon onClick={(e) => { e.stopPropagation(); handleDeleteDirectory(dir.id, e); }}>
                        <IoClose size={16} />
                      </s.DeleteIcon>
                      <s.AddSub onClick={(e) => { e.stopPropagation(); navigate(`${dir.id}/make/lesson`); }}>+</s.AddSub>
                    </>
                  )}
                  <s.Icon>{isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}</s.Icon>
                </s.Right>
              </s.Item>

              <s.ProgressBarWrapper>
                <s.ProgressBar $progress={progress} />
                <s.ProgressText>{Math.round(progress)}%</s.ProgressText>
              </s.ProgressBarWrapper>

              <s.SubDirectoryList $isExpanded={isExpanded}>
                {dir.directoryList?.map(sub => (
                  <s.SubItem key={sub.id} $isRead={sub.isRead} onClick={() => handleDirectoryClick(sub, true)}>
                    <s.Check $isRead={sub.isRead}>
                      {sub.type === 'markdown' && <LuHash />}
                      {sub.type === 'ppt' && <HiOutlineSquare3Stack3D />}
                      {sub.type === 'code' && <IoCodeSlashOutline />}
                      {sub.type === 'docs' && <IoDocumentOutline />}
                    </s.Check>
                    <s.Name>{sub.name}</s.Name>
                    {isTeacher && (
                      <s.DeleteIcon onClick={(e) => { e.stopPropagation(); handleDeleteDocument(sub.id, e); }}>
                        <IoClose size={14} />
                      </s.DeleteIcon>
                    )}
                  </s.SubItem>
                ))}
              </s.SubDirectoryList>
            </s.DirectoryWrapper>
          );
        })}
      </s.Section>
      {/* 선생님만 디렉토리 추가 가능: 인라인으로 DirectorySelect 사용 */}
      {isTeacher && (
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