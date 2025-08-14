import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/entities/UI/Modal';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaCircleCheck } from 'react-icons/fa6';

import * as s from './styles';
import NoticeCard from '@/entities/Main/NoticeCard';
import { Directory, NewsItem, QuestionItem, LessonProps } from '@/shared/types/classroom';
import { directories as initialDirectories, news, questions } from './data';

const LessonComponent: React.FC<LessonProps> = ({ classRoomId }) => {
  const navigate = useNavigate();

  // directories 상태로 읽음 처리 가능하게 복사해서 관리
  const [directories, setDirectories] = useState<Directory[]>(initialDirectories);
  const [selectedModal, setSelectedModal] = useState<
    | { type: 'news'; item: NewsItem }
    | { type: 'question'; item: QuestionItem }
    | null
  >(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // 진행률 계산
  const totalCount = directories.reduce((acc, dir) => acc + 1 + (dir.subDirectories?.length ?? 0), 0);
  const readCount = directories.reduce((acc, dir) => {
    let subRead = 0;
    if (dir.subDirectories) {
      subRead = dir.subDirectories.filter(sd => sd.isRead).length;
    }
    return acc + (dir.isRead ? 1 : 0) + subRead;
  }, 0);
  const progressPercent = Math.round((readCount / totalCount) * 100);

  const toggleDirectory = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // 디렉토리 클릭 시 이동 및 읽음 처리
  const handleDirectoryClick = (dir: Directory, isSubDirectory: boolean = false) => {
    if (isSubDirectory) {
      setDirectories(prev =>
        prev.map(d => {
          if (d.subDirectories) {
            const newSubDirs = d.subDirectories.map(sd =>
              sd.id === dir.id ? { ...sd, isRead: true } : sd
            );

            // 서브디렉토리 모두 읽음인지 체크
            const allSubRead = newSubDirs.every(sd => sd.isRead);

            return {
              ...d,
              subDirectories: newSubDirs,
              isRead: allSubRead, // 모두 읽었으면 상위 디렉토리도 읽음 처리
            };
          }
          return d;
        })
      );

      navigate(`/class/${classRoomId}/${dir.id}`);
    } else {
      toggleDirectory(dir.id);
    }
  };

  const renderModalContent = () => {
    if (!selectedModal) return null;
    const { item, type } = selectedModal;

    return (
      <Modal
        title={type === 'news' ? '새소식' : '질문'}
        notes="default"
        onClose={() => setSelectedModal(null)}
        isWarning={false}
        buttons={[{ text: '닫기', type: 1, onClick: () => setSelectedModal(null) }]}
      >
        <s.ModalContent>
          <s.ModalTitle>{item.title}</s.ModalTitle>
          <s.ModalText>{item.content}</s.ModalText>
          {'author' in item && (
            <s.ModalMeta>
              <strong>작성자:</strong> {item.author}
            </s.ModalMeta>
          )}
          <s.ModalMeta>
            <strong>날짜:</strong> {item.date}
          </s.ModalMeta>
        </s.ModalContent>
      </Modal>
    );
  };

  return (
    <s.Container>
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
                {/* 서브디렉토리 */}
                <s.SubDirectoryList $isExpanded={isExpanded}>
                  {dir.subDirectories?.map(sub => (
                    <s.SubItem key={sub.id} $isRead={sub.isRead} onClick={() => handleDirectoryClick(sub, true)}>
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

      <s.RightPanel>
        <s.Section>
          <NoticeCard cardTitle="새소식" notices={news} onSelect={item => setSelectedModal({ type: 'news', item })} />
        </s.Section>
        <s.Section>
          <NoticeCard cardTitle="최근 질문" notices={questions} onSelect={item => setSelectedModal({ type: 'question', item })} />
        </s.Section>
      </s.RightPanel>

      {renderModalContent()}
    </s.Container>
  );
};

export default LessonComponent;