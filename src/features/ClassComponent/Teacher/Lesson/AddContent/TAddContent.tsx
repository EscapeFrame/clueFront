import React from 'react';
import { AddContentButton } from './styles';
import { DirectorySection, DirectoryItem } from '@/shared/theme/LessonTheme';

interface TAddContentProps {
  sections: (DirectorySection & { isExpanded: boolean })[];
  setSections: React.Dispatch<React.SetStateAction<(DirectorySection & { isExpanded: boolean })[]>>;
}

export default function TAddContent({ sections, setSections }: TAddContentProps) {
  const handleAddSection = () => {
    const newSectionNumber = sections.length + 1;
    const newSection: DirectorySection & { isExpanded: boolean } = {
      classRoomId: `section${newSectionNumber}`,
      title: `${newSectionNumber}차시`,
      isExpanded: false,
      items: [
        {
          id: 1,
          name: '제목',
          directoryOrder: 1,
          url: '',
          isRead: false,
        },
      ],
    };

    setSections(prev => [...prev, newSection]);
  };

  return (
    <div>
      <AddContentButton onClick={handleAddSection}>
        수업카테고리 추가 +
      </AddContentButton>
    </div>
  );
}