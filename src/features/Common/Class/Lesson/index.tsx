import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/entities/UI/Modal';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import * as s from './styles';

import NoticeCard from '@/entities/Main/NoticeCard';
import { Directory, NewsItem, QuestionItem, LessonProps } from '@/shared/types/Class/Lesson';
import { getLessonDirectories, getLessonNews, getLessonQuestions } from '@/features/Common/Class/api/useLesson';
import DirectorySelect from '@/entities/Make/Lesson/directory/DirectorySelect';
import { deleteDirectory } from '@/entities/Make/api/useLesson';
import { useRecoilState } from 'recoil';
import { userState } from '@/shared/model/userState';

const LessonComponent: React.FC<LessonProps> = ({ classRoomId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  // 상태 관리
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 리로드 트리거

  const [selectedModal, setSelectedModal] = useState<
    | { type: 'news'; item: NewsItem }
    | { type: 'question'; item: QuestionItem }
    | null
  >(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // 선생님인지 확인
  const isTeacher = user?.role === 'TEACHER';
  console.log('Current user:', user);
  console.log('User role:', user?.role);
  console.log('Is teacher:', isTeacher);

  // 데이터 불러오기
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

  useEffect(() => {
    if (classRoomId) fetchData();
  }, [classRoomId, refreshTrigger]); // refreshTrigger 추가

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
      } catch (error) {
        console.error("디렉토리 삭제 실패:", error);
      }
    }
  };

  // 디렉토리 추가 완료 시 리로드 트리거
  const handleDirectoryAdded = () => {
    setRefreshTrigger(prev => prev + 1);
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
                  {/* 선생님일 때만 삭제 아이콘 표시 */}
                  {isTeacher && (
                    <s.DeleteIcon
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => handleDeleteDirectory(dir.id, e)}
                  >
                    <IoClose size={16} />
                  </s.DeleteIcon>                  
                  )}
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
          {/* 선생님일 때만 디렉토리 추가 기능 표시 */}
          {isTeacher && (
            <DirectorySelect classRoomId={classRoomId} onDirectoryAdded={handleDirectoryAdded} />
          )}
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
        <Button text="정보수정하기" width = '100%' type={0} onClick={() => navigate(`/class/${classRoomId}/setting`)}/> {/* (선생님)정보 수정 페이지로 이동 */}
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