import { Posts } from '@/shared/theme/ClassRoomInfoTheme';
import ProgressBar from '@/shared/classInfo/ProgressBar/ProgressBar';
import { FaUser } from "react-icons/fa6";
import * as S from './styles';

type ClassHeaderProps = {
  classRoomId: string;
  name: string;
  description: string;
  teacherName: string;
  maxProgress: number;
  progress: number;
};

export default function ClassRoomInfo({
  classRoomId,
  name,
  description,
  teacherName,
  maxProgress,
  progress,
}: ClassHeaderProps) {

  const post = Posts.find(p => p.classRoomId === classRoomId);

  const usedMaxProgress = post?.maxProgress ?? maxProgress;
  const usedProgress = post?.progress ?? progress;

  return (
    <S.ClassHeader>
      <S.ClassInfo>
        <S.TitleFont>{name}</S.TitleFont>
        <S.BodyFont>{description}</S.BodyFont>
        <S.BodyFont><FaUser />&nbsp;{teacherName}</S.BodyFont>
        <S.ProgressFont>진행률: {usedProgress}강 / {usedMaxProgress}강</S.ProgressFont>
        <ProgressBar 
          maxProgress={usedMaxProgress}
          progress={usedProgress}
        />
      </S.ClassInfo>
      <S.Img src="/Paletto/Haeyul.png" alt="haeyul" />
    </S.ClassHeader>
  );
}