import { AddContentButton } from './styles';
import { OrientationSection } from '@/features/ClassComponent/Teacher/Lesson/TLessonCard';

interface TAddContentProps {
  sections: (OrientationSection & { isExpanded: boolean })[];
  setSections: React.Dispatch<React.SetStateAction<(OrientationSection & { isExpanded: boolean })[]>>;
}

export default function TAddContent({ sections, setSections }: TAddContentProps) {
  const handleAddSection = () => {
    const newSectionNumber = sections.length + 1;
    const newSection = {
      id: `section${newSectionNumber}`,
      title: `${newSectionNumber}차시`,
      items: [{ id: 1, title: '제목', isRead: false, url: '' }],
      isExpanded: false,
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