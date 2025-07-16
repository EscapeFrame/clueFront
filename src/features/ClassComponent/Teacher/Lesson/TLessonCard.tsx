import React, { useState } from 'react';
import {
  Body, LessonSection, SectionHeader,
  SectionTitleWrapper, SectionTitle,
  SectionItems, LessonItem, StatusIndicator,
  CheckIcon, LessonButton, TitleContainer,
  EditButton, TitleInput,
} from './styles';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import TAddContent from '../Lesson/AddContent/TAddContent';
import { DirectorySection } from '@/features/ClassComponent/Lesson/Lesson';

interface LessonCardProps {
  sections?: DirectorySection[];
  classId?: string;
}

interface LessonSectionType extends DirectorySection {
  isExpanded: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ sections: rawSections }) => {
  // sections가 undefined/null일 때도 빈 배열로 처리
  const safeSections = Array.isArray(rawSections) ? rawSections : [];
  // 초기 상태: 기존 sections에 isExpanded 필드만 추가
  const [sections, setSections] = useState<LessonSectionType[]>(
    safeSections.map(section => ({
      ...section,
      isExpanded: section.isExpanded ?? false,
    }))
  );

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // 섹션 토글 (열고 닫기)
  const toggleSection = (sectionId: string) => {
    setSections(prev =>
      prev.map(section =>
        section.classRoomId === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  // 제목 편집 시작
  const startEditing = (sectionId: string, currentTitle: string) => {
    setEditingSectionId(sectionId);
    setEditingTitle(currentTitle);
  };

  // 제목 수정 완료
  const handleTitleEdit = (sectionId: string) => {
    if (editingTitle.trim()) {
      setSections(prev =>
        prev.map(section =>
          section.classRoomId === sectionId
            ? { ...section, title: editingTitle.trim() }
            : section
        )
      );
      setEditingSectionId(null);
    }
  };

  // 키보드 이벤트 처리 (Enter, Escape)
  const handleKeyPress = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter') {
      handleTitleEdit(sectionId);
    } else if (e.key === 'Escape') {
      setEditingSectionId(null);
    }
  };

  // 강의 아이템 클릭 시 isRead true로 변경 + 페이지 이동(임시 alert)
  const handleLessonClick = (sectionId: string, itemId: number, url?: string) => {
    setSections(prev =>
      prev.map(section =>
        section.classRoomId === sectionId
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
      // 추후 라우터로 실제 페이지 이동 처리 예정
    }
  };

  return (
    <Body>
      {sections.map(section => (
        <LessonSection key={section.classRoomId}>
          <SectionHeader onClick={() => toggleSection(section.classRoomId)}>
            <SectionTitleWrapper>
              {section.isExpanded ? <FaChevronUp /> : <FaChevronDown />}
              {editingSectionId === section.classRoomId ? (
                <TitleInput
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, section.classRoomId)}
                  onBlur={() => handleTitleEdit(section.classRoomId)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              ) : (
                <TitleContainer>
                  <SectionTitle>{section.title}</SectionTitle>
                  <EditButton
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(section.classRoomId, section.title);
                    }}
                  >
                    <FaPencilAlt />
                  </EditButton>
                </TitleContainer>
              )}
            </SectionTitleWrapper>
          </SectionHeader>

          {section.isExpanded && (
            <SectionItems>
              {section.items.map(item => (
                <LessonItem key={item.id}>
                  <StatusIndicator read={item.isRead}>
                    {item.isRead && <CheckIcon as={FaCheck} />}
                  </StatusIndicator>
                  <LessonButton onClick={() => handleLessonClick(section.classRoomId, item.id, item.url)}>
                    {item.name}
                  </LessonButton>
                </LessonItem>
              ))}
            </SectionItems>
          )}
        </LessonSection>
      ))}
      <TAddContent sections={sections} setSections={setSections} />
    </Body>
  );
};

export default LessonCard;