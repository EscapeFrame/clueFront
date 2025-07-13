import { useParams } from 'react-router-dom';
import ClassRoomInfo from '@/shared/classInfo/ClassRoomInfo';
import LessonGroup from '@/features/ClassComponent/ClassRoomInfo/LessonGroup';
import { Posts } from '@/shared/theme/ClassRoomInfoTheme';

export default function ClassRoom() {
    const { classId } = useParams<{ classId: string }>();
  
    const post = Posts.find(p => p.classId === classId);
    if (!post) return <div>404 - 클래스를 찾을 수 없습니다</div>;  // 404 메시지 추가
  
    return (
        <div style={{minHeight:'100%'}}>
            <ClassRoomInfo 
                classId={post.classId}
                title={post.title}
                description={post.description}
                teacherId={post.teacherId}
                maxProgress={post.maxProgress}
                progress={post.progress}
            />
            <LessonGroup />
        </div>
    );
}