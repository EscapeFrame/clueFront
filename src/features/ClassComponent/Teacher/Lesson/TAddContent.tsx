import React, { useState } from 'react';
import styles from '@/shared/css/Class/Lesson/LessonCard.module.css';
import { OrientationSection } from './TLessonCard';

interface TAddContentProps {
  sections: (OrientationSection & { isExpanded: boolean })[];
  setSections: React.Dispatch<React.SetStateAction<(OrientationSection & { isExpanded: boolean })[]>>;
}

export default function TAddContent({ sections, setSections }: TAddContentProps) {
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const handleAddSection = () => {
    const newSectionNumber = sections.length + 1;
    const newSection = {
      id: `section${newSectionNumber}`,
      title: `${newSectionNumber}차시`,
      count: 0,
      items: [
        { id: 1, title: '제목', isRead: false, url: '' },
      ],
      isExpanded: false
    };

    setSections(prev => [...prev, newSection]);
  };

  const handleTitleEdit = (sectionId: string, newTitle: string) => {
    if (newTitle.trim()) {
      setSections(prev =>
        prev.map(section =>
          section.id === sectionId
            ? { ...section, title: newTitle.trim() }
            : section
        )
      );
    }
    setEditingSectionId(null);
  };

  return (
    <div>
      <button className={styles.addContent} onClick={handleAddSection}>
        수업카테고리 추가 +
      </button>
    </div>
  );
}