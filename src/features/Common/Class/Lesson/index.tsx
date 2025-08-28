import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import * as s from './styles';
import { LessonProps, Directory } from '@/shared/types/class/lesson';
import { useLesson } from '../hooks/useLesson';
import NoticeCard from '@/entities/Main/NoticeCard';
import { Modal } from '@/entities/UI/Modal';

export const LessonComponent: React.FC<LessonProps> = ({ classRoomId }) => {
  const navigate = useNavigate();
  const { directories, news, questions, loading, error, updateDirectory } = useLesson({ classRoomId });
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [selectedModal, setSelectedModal] = useState<{
    type: 'news' | 'question';
    item: { title: string; content: string; author?: string; date: string };
  } | null>(null);

  const toggleDirectory = (id: number) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleDirectoryClick = (dir: Directory) => {
    updateDirectory(dir.directoryOrder, { /* 필요한 수정 필드 */ });
    toggleDirectory(dir.directoryOrder);
    navigate(`/class/${classRoomId}/${dir.directoryOrder}`);
  };

  const handleNoticeClick = (item: { title: string; content: string; author?: string; date: string }) => {
    setSelectedModal({ type: 'news', item });
  };

  const handleQuestionClick = (item: { title: string; content: string; author?: string; date: string }) => {
    setSelectedModal({ type: 'question', item });
  };

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <s.Container>
      {/* 왼쪽: 강의 디렉토리 */}
      <s.LeftPanel>
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
      </s.LeftPanel>

      {/* 오른쪽: 새소식 + 질문 */}
      <s.RightPanel>
        <NoticeCard cardTitle="새소식" notices={news} onSelect={handleNoticeClick} />
        <NoticeCard cardTitle="최근 질문" notices={questions} onSelect={handleQuestionClick} />
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
            {'author' in selectedModal.item && selectedModal.item.author && (
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