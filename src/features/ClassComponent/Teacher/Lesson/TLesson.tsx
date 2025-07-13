import React, { useState } from 'react';
import {
  Body, LessonSection, SectionHeader,
  SectionTitleWrapper, SectionTitle,
  SectionItems, LessonItem, StatusIndicator,
  CheckIcon, LessonButton,
} from '@/features/ClassComponent/Lesson/styles';

import { FaChevronDown, FaChevronUp, FaPencilAlt } from 'react-icons/fa';

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
    <Body>
      {sections.map(section => (
        <LessonSection key={section.id}>
          <SectionHeader onClick={() => toggleSection(section.id)}>
            <SectionTitleWrapper>
              {section.isExpanded ? <FaChevronUp /> : <FaChevronDown />}
              {editingSectionId === section.id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, section.id)}
                  onBlur={() => handleTitleEdit(section.id)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              ) : (
                <>
                  <SectionTitle>{section.title}</SectionTitle>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(section.id, section.title);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: '8px',
                    }}
                    aria-label="Edit Section Title"
                  >
                    <FaPencilAlt />
                  </button>
                </>
              )}
            </SectionTitleWrapper>
          </SectionHeader>

          {section.isExpanded && (
            <SectionItems>
              {section.items.map(item => (
                <LessonItem key={item.id}>
                  <StatusIndicator isRead={item.isRead}>
                    {item.isRead && <CheckIcon />}
                  </StatusIndicator>
                  <LessonButton
                    onClick={() => handleLessonClick(section.id, item.id, item.url)}
                  >
                    {item.title}
                  </LessonButton>
                </LessonItem>
              ))}
            </SectionItems>
          )}
        </LessonSection>
      ))}
    </Body>
  );
};

export default LessonCard;