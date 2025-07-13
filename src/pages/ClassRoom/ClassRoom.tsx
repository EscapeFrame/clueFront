import { useParams } from 'react-router-dom';
import ClassRoomInfo from '@/shared/classInfo/ClassRoomInfo/ClassRoomInfo';
import LessonGroup from '@/features/ClassComponent/ClassRoomInfo/LessonGroup/LessonGroup';
import { Posts } from '@/shared/theme/ClassRoomInfoTheme';
import NotFound from '../NotFound';
import * as S from './styles';

export default function ClassRoom() {
  const { classId } = useParams<{ classId: string }>();

  const post = Posts.find(p => p.classId === classId);
  if (!post) return <NotFound />;

  return (
    <S.Container>
      <ClassRoomInfo
        classId={post.classId}
        title={post.title}
        description={post.description}
        teacherId={post.teacherId}
        maxProgress={post.maxProgress}
        progress={post.progress}
      />
      <LessonGroup />
    </S.Container>
  );
}