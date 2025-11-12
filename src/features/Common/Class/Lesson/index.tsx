import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoDocumentOutline } from "react-icons/io5";
import { IoCodeSlashOutline } from "react-icons/io5";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { LuHash } from "react-icons/lu";

import * as s from './styles';

import NoticeCard from '@/entities/Main/NoticeCard';
import { Directory, NewsItem, QuestionItem, LessonProps } from '@/shared/types/Class/Lesson';
import { getLessonDirectories, getLessonNews, getLessonQuestions, getClassCode } from '../api';
import DirectorySelect from '@/entities/Make/Lesson/directory/DirectorySelect';
import { deleteDirectory, deleteDocument } from '@/entities/Make/api/useLesson';
import { useRecoilState } from 'recoil';
import { userState } from '@/shared/model/userState';

const LessonComponent: React.FC<LessonProps> = ({ classRoomId }) => {
  const navigate = useNavigate();
  const [user] = useRecoilState(userState);

  // 상태 관리
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [code, setCode] = useState("코드를 불러오지 못했습니다.")
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 리로드 트리거

  const [selectedModal, setSelectedModal] = useState<
    | { type: 'news'; item: NewsItem }
    | { type: 'question'; item: QuestionItem }
    | null
  >(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // 선생님인지 확인
  const isTeacher = !!user && (user.role === 'TCH' || user.role === 'TEACHER');

  // 디버긍용
  useEffect(() => {
    console.log("현재 사용자 정보:", user);
    console.log("현재 사용자 role:", user?.role);
    console.log("isTeacher 변수 값:", isTeacher);
  }, [user, isTeacher]);

  // 데이터 불러오기
  const fetchData = async () => {
    try {
      const classInfo = await getLessonDirectories(classRoomId);
      // 세션 스토리지에 디렉토리 정보 저장
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
      setNews(await getLessonNews(classRoomId));
      setQuestions(await getLessonQuestions(classRoomId));
      setCode(await getClassCode(classRoomId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classRoomId) fetchData();
  }, [classRoomId, refreshTrigger]); // refreshTrigger 추가

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

  if (loading) {
    return (
      <s.Container>
        {/* 나중에 loading style로 변경 */}
        <div>
          수업 정보를 불러오는 중...
        </div>
      </s.Container>
    );
  }

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
      alert("선생님만 디렉토리를 삭제할 수 있습니다.");
      return;
    }

    if (window.confirm("정말로 이 도큐먼트 삭제하시겠습니까?")) {
      try {
        const success = await deleteDocument(docId);
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

  const makeLesson = (dirId: string) => {
    navigate(`${dirId}/make/lesson`);
  }

  // 디렉토리 추가 완료 시 리로드 트리거
  const handleDirectoryAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCodeSelect = (item: { title: string }) => {
    navigator.clipboard.writeText(item.title ?? '')
      .then(() => {
        alert('수업 코드가 클립보드에 복사되었습니다.');
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
        alert('코드 복사에 실패했습니다.');
      });
  };

  return (
     <s.Container>
      <s.SectionHeader>
        <s.LeftGroup>
          <s.Description>※ 디렉토리 제목 클릭 시 수정 가능합니다.</s.Description>
        </s.LeftGroup>
        <s.RightGroup>
          <s.SettingButton onClick={() => navigate("setting")}>
            학습실 관리
          </s.SettingButton>
          {isTeacher && (
            <NoticeCard
              cardTitle="수업코드"
              notices={[{ noticeId: 'class-code', title: code, type: 'SERVICE' }]}
              onSelect={handleCodeSelect}
            />
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
              {/* 최상위 디렉토리 Item */}
              <s.Item $isRead={dir.isRead} onClick={() => handleDirectoryClick(dir)}>
                <s.Left>
                  <s.Name>{dir.name}</s.Name>
                  <s.Progress>{readCount}/{totalCount}</s.Progress>
                </s.Left>

                <s.Right>
                  {isTeacher && (
                    <s.AddSub onClick={(e) => { e.stopPropagation(); makeLesson?.(dir.id); }}>
                      +
                    </s.AddSub>
                  )}
                  <s.Icon>{isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}</s.Icon>
                </s.Right>
              </s.Item>

              <s.ProgressBarWrapper>
                <s.ProgressBar $progress={progress} />
                <s.ProgressText>{Math.round(progress)}%</s.ProgressText>
              </s.ProgressBarWrapper>

              <s.SubDirectoryList $isExpanded={isExpanded}>
                {dir.directoryList?.map((sub) => (
                  <s.SubItem
                    key={sub.id}
                    $isRead={sub.isRead}
                    onClick={() => handleDirectoryClick(sub, true)}
                  >
                    <s.Check $isRead={sub.isRead}>
                      {/* 자료 종류별 아이콘 */}
                      {sub.type === 'markdown' && <LuHash />}
                      {sub.type === 'ppt' && <HiOutlineSquare3Stack3D />}
                      {sub.type === 'code' && <IoCodeSlashOutline />}
                      {sub.type === 'docs' && <IoDocumentOutline />}
                    </s.Check>

                    <s.Name>{sub.name}</s.Name>
                  </s.SubItem>
                ))}
              </s.SubDirectoryList>

            </s.DirectoryWrapper>
          );
        })}
      </s.Section>
    </s.Container>
  );
};

export default LessonComponent;