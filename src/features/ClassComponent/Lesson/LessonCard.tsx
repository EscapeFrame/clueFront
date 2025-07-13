import React, { useState } from 'react';
import {
  Body, LessonSection, SectionHeader,
  SectionTitleWrapper, SectionTitle, SectionItems, LessonItem,
  StatusIndicator,CheckIcon,LessonButton,
} from './styles';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

  const toggleSection = (sectionId: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
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
      // 실제 페이지 이동은 라우터 등으로 처리 예정
    }
  };

  return (
    <Body>
      {sections.map(section => (
        <LessonSection key={section.id}>
          <SectionHeader onClick={() => toggleSection(section.id)}>
            <SectionTitleWrapper>
              {section.isExpanded ? <FaChevronUp /> : <FaChevronDown />}
              <SectionTitle>{section.title}</SectionTitle>
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