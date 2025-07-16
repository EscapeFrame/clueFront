import { useParams } from 'react-router-dom';
import ClassRoomInfo from '@/shared/classInfo/ClassRoomInfo/ClassRoomInfo';
import TLessonGroup from '@/features/ClassComponent/Teacher/ClassRoomInfo/TLessonGroup';
import TCheckStudent from '@/features/ClassComponent/Teacher/Assignment/TCheckStudent';
import * as S from './styles';
import NotFound from '../NotFound/NotFound';
import { useEffect, useState } from 'react';
import TCustomapi from '@/shared/api/Taxios';

export default function TClassRoom() {
  const { classId, lessonId } = useParams<{ classId: string; lessonId?: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  if (lessonId) {
    return <TCheckStudent />;
  }

  useEffect(() => {
    if (classId) {
      TCustomapi.get(`/api/class/${classId}/all`)
        .then(res => {
          const data = res.data;
          setPost({
            classRoomId: String(data.classRoomId),
            name: data.classRoomName,
            description: data.description,
            teacherName: Array.isArray(data.teacherNames) ? data.teacherNames.join(', ') : '',
            maxProgress: data.directoryList?.length ?? 0,
            progress: 0, // 필요시 계산
          });
        })
        .catch(() => setPost(null))
        .finally(() => setLoading(false));
    }
  }, [classId]);

  if (loading) return null;
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