import { useParams } from 'react-router-dom';
import ClassRoomInfo from '@/shared/classInfo/ClassRoomInfo/ClassRoomInfo';
import TLessonGroup from '@/features/ClassComponent/Teacher/ClassRoomInfo/TLessonGroup';
import { Posts } from '@/shared/theme/ClassRoomInfoTheme';
import TCheckStudent from '@/features/ClassComponent/Teacher/Assignment/TCheckStudent';
import * as S from './styles';
import NotFound from '../NotFound/NotFound';

export default function TClassRoom() {
  const { classId, lessonId } = useParams<{ classId: string; lessonId?: string }>();

  if (lessonId) {
    return <TCheckStudent />;
  }

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
      <TLessonGroup />
    </S.Container>
  );
}