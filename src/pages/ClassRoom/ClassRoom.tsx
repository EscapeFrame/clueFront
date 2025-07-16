import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Customapi from '@/shared/api/axios';
import ClassRoomInfo from '@/shared/classInfo/ClassRoomInfo/ClassRoomInfo';
import LessonGroup from '@/features/ClassComponent/ClassRoomInfo/LessonGroup/LessonGroup';
import NotFound from '../NotFound/NotFound';
import * as S from './styles';

export default function ClassRoom() {
  const { classId } = useParams<{ classId: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (classId) {
      Customapi.get(`/api/class/${classId}/all`)
        .then(res => {
          console.log('백엔드 응답:', res.data);
          const data = res.data;
          setPost({
            classRoomId: String(data.classRoomId),
            name: data.classRoomName,
            description: data.description,
            teacherName: Array.isArray(data.teacherNames) ? data.teacherNames.join(', ') : '',
            maxProgress: data.directoryList?.length ?? 0,
            progress: 0,
          });
        })
        .catch((err) => {
          console.error('API 에러:', err);
          setPost(null);
        })
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
      <LessonGroup />
    </S.Container>
  );
}