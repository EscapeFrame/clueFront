import { ClassInfoProps } from '@/shared/types/classroom';
import ProgressBar from '@/entities/UI/ProgressBar';
import { FaUserAlt } from "react-icons/fa";
import * as s from './styles';

export const ClassInfo: React.FC<ClassInfoProps> = ({
  name, teacherName, description, progress, maxProgress, imageUrl
}) => {
  return (
    <s.Container>
      <s.LeftSection>
        <s.Title>{name}</s.Title>
        <s.Description>{description}</s.Description>

        <s.TeacherRow>
          <FaUserAlt />
          <span>{teacherName}</span>
        </s.TeacherRow>

        <ProgressBar progress={progress} maxProgress={maxProgress} />
      </s.LeftSection>

      {imageUrl && <s.Img imageUrl={imageUrl} />}
    </s.Container>
  );
};