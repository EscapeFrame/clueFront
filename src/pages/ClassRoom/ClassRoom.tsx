import { useParams } from 'react-router-dom';
import ClassRoomInfo from '@/shared/classInfo/ClassRoomInfo/ClassRoomInfo';
import LessonGroup from '@/features/ClassComponent/ClassRoomInfo/LessonGroup/LessonGroup';
import { Posts } from '@/shared/theme/ClassRoomInfoTheme';
import NotFound from '../NotFound/NotFound';
import * as S from './styles';

export default function ClassRoom() {
  const { classRoomId } = useParams<{ classRoomId: string }>();

  const post = Posts.find(p => p.classRoomId === classRoomId);
  if (!post) return <NotFound />;

  return (
    <S.Container>
      <ClassRoomInfo
        classRoomId={post.classRoomId}
        name={post.name}
        description={post.description}
        teacherName={post.teacherName}
        maxProgress={post.maxProgress}
        progress={post.progress}
      />
      <LessonGroup />
    </S.Container>
  );
}