import React, { useState } from 'react';
import styles from '@/shared/css/Class/Lesson/LessonCard.module.css';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import TAddContent from '@/features/ClassComponent/Teacher/Lesson/AddContent/TAddContent';

export interface OrientationItem {
  id: number;
  title: string;
  isRead: boolean;
  url?: string;
}

export interface OrientationSection {
  id: string;
  title: string;
  items: OrientationItem[];
}

interface LessonCardProps {
  sections: OrientationSection[];
}

const LessonCard: React.FC<LessonCardProps> = ({ sections: initialSections }) => {
  // 내부에서 펼침 상태와 읽음 상태 관리 위해 복사본 상태 생성해야됨!
  const [sections, setSections] = useState(
    initialSections.map(section => ({ ...section, isExpanded: false }))
  );
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const toggleSection = (sectionId: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const startEditing = (sectionId: string, currentTitle: string) => {
    setEditingSectionId(sectionId);
    setEditingTitle(currentTitle);
  };

  const handleTitleEdit = (sectionId: string) => {
    if (editingTitle.trim()) {
      setSections(prev =>
        prev.map(section =>
          section.id === sectionId
            ? { ...section, title: editingTitle.trim() }
            : section
        )
      );
      setEditingSectionId(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter') {
      handleTitleEdit(sectionId);
    } else if (e.key === 'Escape') {
      setEditingSectionId(null);
    }
  };

  const handleLessonClick = (sectionId: string, itemId: number, url?: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? {
            ...section,
            items: section.items.map(item =>
              item.id === itemId ? { ...item, isRead: true } : item
            ),
          }
          : section
      )
    );

    if (url) {
      alert(`${url} 페이지로 이동`);
      /* 나중에 url 연결...! */
    }
  };

  return (
    <div className={styles.body}>
      {sections.map(section => (
        <div key={section.id} className={styles.lessonSection}>
          <button
            onClick={() => toggleSection(section.id)}
            className={styles.sectionHeader}
          >
            <div className={styles.sectionTitleWrapper}>
              {section.isExpanded ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
              {editingSectionId === section.id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, section.id)}
                  onBlur={() => handleTitleEdit(section.id)}
                  className={styles.titleInput}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              ) : (
                <div className={styles.titleContainer}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(section.id, section.title);
                    }}
                    className={styles.editButton}
                  >
                    <FaPencilAlt />
                  </button>
                </div>
              )}
            </div>
          </button>

          {section.isExpanded && (
            <div className={styles.sectionItems}>
              {section.items.map(item => (
                <div key={item.id} className={styles.lessonItem}>
                  <div className={`${styles.statusIndicator} ${item.isRead ? styles.read : ''}`}>
                    {item.isRead && <FaCheck className={styles.checkIcon} />}
                  </div>
                  <button
                    onClick={() => handleLessonClick(section.id, item.id, item.url)}
                    className={styles.lessonButton}
                  >
                    {item.title}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <TAddContent sections={sections} setSections={setSections} />
    </div>
  );
};

export default LessonCard;