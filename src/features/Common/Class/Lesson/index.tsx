import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import * as s from './styles';
import { LessonProps, Directory } from '@/shared/types/class/lesson';
import { useLesson } from '../hooks/useLesson';
import NoticeCard from '@/entities/Main/NoticeCard';

export const LessonComponent: React.FC<LessonProps> = ({ classRoomId }) => {
  const navigate = useNavigate();
  const { directories, news, questions, loading, error, updateDirectory } = useLesson({ classRoomId });
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleDirectory = (id: number) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleDirectoryClick = (dir: Directory) => {
    // 디렉토리 클릭 시 읽음 처리 및 서브디렉토리 관리
    updateDirectory(dir.directoryOrder, { /* 필요한 수정 필드 */ });
    toggleDirectory(dir.directoryOrder);
    navigate(`/class/${classRoomId}/${dir.directoryOrder}`);
  };

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <s.Container>
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

      <s.RightPanel>
        <NoticeCard cardTitle="새소식" notices={news} onSelect={() => {}} />
        <NoticeCard cardTitle="최근 질문" notices={questions} onSelect={() => {}} />
      </s.RightPanel>
    </s.Container>
  );
};

export default LessonComponent;