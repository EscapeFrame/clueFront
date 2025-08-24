import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';
<<<<<<< HEAD
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import * as s from './styles';
import { LessonProps, Directory } from '@/shared/types/class/lesson';
import { useLesson } from '../hooks/useLesson';
import NoticeCard from '@/entities/Main/NoticeCard';

export const LessonComponent: React.FC<LessonProps> = ({ classRoomId }) => {
=======
import * as s from './styles';

import NoticeCard from '@/entities/Main/NoticeCard';
import { Directory, NewsItem, QuestionItem, LessonProps } from '@/shared/types/classroom';
import { getLessonDirectories, getLessonNews, getLessonQuestions } from '../api';

const LessonComponent: React.FC<LessonProps> = ({ classId }) => {
>>>>>>> 1793421 (feat(#93): features/Common/Class  axios 연결)
  const navigate = useNavigate();
  const { directories, news, questions, loading, error, updateDirectory } = useLesson({ classRoomId });
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

<<<<<<< HEAD
  const toggleDirectory = (id: number) => {
=======
  // 상태 관리
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedModal, setSelectedModal] = useState<
    | { type: 'news'; item: NewsItem }
    | { type: 'question'; item: QuestionItem }
    | null
  >(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dirs, n, q] = await Promise.all([
          getLessonDirectories(classId),
          getLessonNews(classId),
          getLessonQuestions(classId),
        ]);
        setDirectories(dirs);
        setNews(n);
        setQuestions(q);
      } catch (err) {
        console.error('강의 데이터 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    if (classId) fetchData();
  }, [classId]);

  const toggleDirectory = (id: string) => {
>>>>>>> 1793421 (feat(#93): features/Common/Class  axios 연결)
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

<<<<<<< HEAD
  const handleDirectoryClick = (dir: Directory) => {
    // 디렉토리 클릭 시 읽음 처리 및 서브디렉토리 관리
    updateDirectory(dir.directoryOrder, { /* 필요한 수정 필드 */ });
    toggleDirectory(dir.directoryOrder);
    navigate(`/class/${classRoomId}/${dir.directoryOrder}`);
  };

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;

=======
  const handleDirectoryClick = (dir: Directory, isSubDirectory: boolean = false) => {
    if (isSubDirectory) {
      setDirectories(prev =>
        prev.map(d => {
          if (d.subDirectories) {
            const newSubDirs = d.subDirectories.map(sd =>
              sd.id === dir.id ? { ...sd, isRead: true } : sd
            );
            const allSubRead = newSubDirs.every(sd => sd.isRead);
            return { ...d, subDirectories: newSubDirs, isRead: allSubRead };
          }
          return d;
        })
      );
      navigate(`/class/${classId}/${dir.id}`); // 미확정
    } else {
      toggleDirectory(dir.id);
    }
  };

>>>>>>> 1793421 (feat(#93): features/Common/Class  axios 연결)
  return (
    <s.Container>
      {/* 왼쪽: 강의 디렉토리 */}
      <s.LeftPanel>
<<<<<<< HEAD
        {directories.map(dir => {
          const isExpanded = expandedIds.has(dir.directoryOrder);
          return (
            <s.DirectoryWrapper key={dir.directoryOrder}>
              <s.Item $isRead={dir.isRead} onClick={() => handleDirectoryClick(dir)}>
                <s.Check>{dir.isRead && <FaCircleCheck />}</s.Check>
                <s.Name>{dir.name}</s.Name>
                <s.Icon>{isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}</s.Icon>
              </s.Item>
            </s.DirectoryWrapper>
          );
        })}
=======
        <s.Section>
          {directories.map(dir => {
            const isExpanded = expandedIds.has(dir.id);
            return (
              <s.DirectoryWrapper key={dir.id}>
                <s.Item $isRead={dir.isRead} onClick={() => handleDirectoryClick(dir)}>
                  <s.Check>{dir.isRead && <FaCircleCheck />}</s.Check>
                  <s.Name>{dir.name}</s.Name>
                  <s.Icon>{isExpanded ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}</s.Icon>
                </s.Item>
                <s.SubDirectoryList $isExpanded={isExpanded}>
                  {dir.subDirectories?.map(sub => (
                    <s.SubItem
                      key={sub.id}
                      $isRead={sub.isRead}
                      onClick={() => handleDirectoryClick(sub, true)}
                    >
                      <s.Check>{sub.isRead && <FaCircleCheck />}</s.Check>
                      <s.Name>{sub.name}</s.Name>
                    </s.SubItem>
                  ))}
                </s.SubDirectoryList>
              </s.DirectoryWrapper>
            );
          })}
        </s.Section>
>>>>>>> 1793421 (feat(#93): features/Common/Class  axios 연결)
      </s.LeftPanel>

      {/* 오른쪽: 새소식 + 질문 */}
      <s.RightPanel>
        <NoticeCard cardTitle="새소식" notices={news} onSelect={() => {}} />
        <NoticeCard cardTitle="최근 질문" notices={questions} onSelect={() => {}} />
      </s.RightPanel>
<<<<<<< HEAD
=======

      {/* 모달 */}
      {selectedModal && (
        <Modal
          title={selectedModal.type === 'news' ? '새소식' : '질문'}
          notes="default"
          onClose={() => setSelectedModal(null)}
          isWarning={false}
          buttons={[{ text: '닫기', type: 1, onClick: () => setSelectedModal(null) }]}
        >
          <s.ModalContent>
            <s.ModalTitle>{selectedModal.item.title}</s.ModalTitle>
            <s.ModalText>{selectedModal.item.content}</s.ModalText>
            {'author' in selectedModal.item && (
              <s.ModalMeta>
                <strong>작성자:</strong> {selectedModal.item.author}
              </s.ModalMeta>
            )}
            <s.ModalMeta>
              <strong>날짜:</strong> {selectedModal.item.date}
            </s.ModalMeta>
          </s.ModalContent>
        </Modal>
      )}
>>>>>>> 1793421 (feat(#93): features/Common/Class  axios 연결)
    </s.Container>
  );
};

export default LessonComponent;