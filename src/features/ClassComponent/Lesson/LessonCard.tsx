import React, { useState } from "react";
import {
  Body, LessonSection,
  SectionHeader,
  SectionTitleWrapper,
  SectionTitle,
  SectionItems,
  LessonItem,
  StatusIndicator,
  CheckIcon,
  LessonButton,
} from "./styles";


import { useNavigate } from 'react-router-dom';
import { DirectorySection } from '@/features/ClassComponent/Lesson/Lesson';

interface LessonCardProps {
  sections: DirectorySection[];
  classId?: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ sections, classId }) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    () =>
      sections.reduce((acc, section) => {
        acc[section.classRoomId] = section.isExpanded ?? false;
        return acc;
      }, {} as Record<string, boolean>)
  );

  const toggleSection = (classRoomId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [classRoomId]: !prev[classRoomId],
    }));
  };

  return (
    <Body>
      {sections.map((section) => (
        <LessonSection key={section.classRoomId}>
          <SectionHeader onClick={() => toggleSection(section.classRoomId)}>
            <SectionTitleWrapper>
              <SectionTitle>{section.title}</SectionTitle>
            </SectionTitleWrapper>
            {/* 토글 표시 */}
            <div>{expandedSections[section.classRoomId] ? "▲" : "▼"}</div>
          </SectionHeader>

          {expandedSections[section.classRoomId] && (
            <SectionItems>
              {(section.items ?? [])
                .sort((a, b) => a.directoryOrder - b.directoryOrder)
                .map((item) => (
                  <LessonItem key={item.id}
                    onClick={() => navigate(`/class/${section.classRoomId}`)}
                  >
                    <StatusIndicator isRead={!!item.url}>
                      <CheckIcon />
                    </StatusIndicator>
                    {/* url 있으면 버튼(클릭 시 링크 이동), 없으면 그냥 텍스트 */}
                    {item.url ? (
                      <LessonButton
                        onClick={e => {
                          e.stopPropagation();
                          window.open(item.url, "_blank");
                        }}
                      >
                        {item.name}
                      </LessonButton>
                    ) : (
                      <span>{item.name}</span>
                    )}
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