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
import { getLessonDirectories, getLessonNews, getLessonQuestions } from '../api';
import DirectorySelect from '@/entities/Make/Lesson/directory/DirectorySelect';
import { deleteDirectory, deleteDocument } from '@/entities/Make/api/useLesson';
import { useRecoilState } from 'recoil';
import { userState } from '@/shared/model/userState';

const LessonComponent: React.FC<LessonProps> = ({ classRoomId, code }) => {
  const navigate = useNavigate();
  const [user] = useRecoilState(userState);

  const [directories, setDirectories] = useState<Directory[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const isTeacher = !!user && (user.role === 'TCH' || user.role === 'TEACHER');
  const [copiedTitle, setCopiedTitle] = useState<string>('');

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
      if (classInfo.directoryList) {
        sessionStorage.setItem(`lessonDirectories-${classRoomId}`, JSON.stringify(classInfo.directoryList));
      }

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (classRoomId) fetchData();
  }, [classRoomId, refreshTrigger]);

  const toggleDirectory = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
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
    navigator.clipboard.writeText(code ?? '')
      .then(() => {
        setCopiedTitle(code ?? '');
        alert('수업 코드가 클립보드에 복사되었습니다.');
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
        alert('코드 복사에 실패했습니다.');
      });
  };

  if (loading) return <s.Container>수업 정보를 불러오는 중...</s.Container>;

  return (
    <s.Container>
      <s.SectionHeader>
        <s.LeftGroup>
          <s.Description>※ 디렉토리 제목 클릭 시 수정 가능합니다.</s.Description>
        </s.LeftGroup>
        <s.RightGroup>
          <s.SettingButton onClick={() => navigate("setting")}>학습실 관리</s.SettingButton>

          {isTeacher && (
            <s.CardContainer onClick={handleCodeSelect}>
              <s.CardTitle>수업코드</s.CardTitle>
              <s.CardText>{(copiedTitle || code) ?? "알 수 없음"}</s.CardText>
            </s.CardContainer>
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
                    <s.AddSub onClick={(e) => { e.stopPropagation(); navigate(`${dir.id}/make/lesson`); }}>+</s.AddSub>
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