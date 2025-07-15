import { useParams } from 'react-router-dom';
import ClassRoomInfo from '@/shared/classInfo/ClassRoomInfo/ClassRoomInfo';
import TLessonGroup from '@/features/ClassComponent/Teacher/ClassRoomInfo/TLessonGroup';
import { Posts } from '@/shared/theme/ClassRoomInfoTheme';
import TCheckStudent from '@/features/ClassComponent/Teacher/Assignment/TCheckStudent';
import * as S from './styles';
import NotFound from '../NotFound';

export default function TClassRoom() {
  const { classId, lessonId } = useParams<{ classId: string; lessonId?: string }>();

  if (lessonId) {
    return <TCheckStudent />;
  }

  const post = Posts.find(p => p.classRoomId === classId);
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
      <TLessonGroup />
    </S.Container>
  );
}