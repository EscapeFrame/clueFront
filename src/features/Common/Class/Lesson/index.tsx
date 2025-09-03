import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/entities/UI/Modal';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaCircleCheck } from 'react-icons/fa6';
import * as s from './styles';

import NoticeCard from '@/entities/Main/NoticeCard';
import { Directory, NewsItem, QuestionItem, LessonProps } from '@/shared/types/Class/Lesson';
import { getLessonDirectories, getLessonNews, getLessonQuestions } from '../api/useAssignment';


const LessonComponent: React.FC<LessonProps> = ({ classRoomId }) => {
  const navigate = useNavigate();

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
        const classInfo = await getLessonDirectories(classRoomId);
        const dirs: Directory[] = classInfo.directoryList.map((dir) => ({
          id: dir.directoryId.toString(),
          name: dir.directoryName,
          isRead: false,
          directoryList: [], // 필요시 documentList로 변환 가능
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

    if (classRoomId) fetchData();
  }, [classRoomId]);

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
      navigate(`/class/${classRoomId}/${dir.id}`); // 미확정
    } else {
      toggleDirectory(dir.id);
    }
  };

  return (
    <s.Container>
      {/* 왼쪽: 강의 디렉토리 */}
      <s.LeftPanel>
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
                  {dir.directoryList?.map(sub => (
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
      </s.LeftPanel>

      {/* 오른쪽: 새소식 + 질문 */}
      <s.RightPanel>
        <s.Section>
          <NoticeCard cardTitle="새소식" notices={news} onSelect={item => setSelectedModal({ type: 'news', item })} />
        </s.Section>
        <s.Section>
          <NoticeCard cardTitle="최근 질문" notices={questions} onSelect={item => setSelectedModal({ type: 'question', item })} />
        </s.Section>
      </s.RightPanel>

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
    </s.Container>
  );
};

export default LessonComponent;