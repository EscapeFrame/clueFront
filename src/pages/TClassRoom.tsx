import { useParams } from 'react-router-dom';
import ClassRoomInfo from '@/shared/classInfo/ClassRoomInfo';
import TLessonGroup from '@/features/ClassComponent/Teacher/ClassRoomInfo/TLessonGroup';
import { Posts } from '@/shared/theme/ClassRoomInfoTheme';
import styles from '@/shared/css/Class/ClassRoom.module.css';
import TCheckStudent from '@/features/ClassComponent/Teacher/Assignment/TCheckStudent';

export default function TClassRoom() {
    const { classId, lessonId } = useParams<{ classId: string, lessonId?: string }>();

    // lessonId가 있으면 채점 상세만 보여줌
    if (lessonId) {
        return <TCheckStudent />;
    }

    const post = Posts.find(p => p.classId === classId);
    if (!post) return <div>404 - 클래스를 찾을 수 없습니다</div>;  // 404 메시지 추가
  
    return (
        <div className={styles.container}>
            <ClassRoomInfo 
                classId={post.classId}
                title={post.title}
                description={post.description}
                teacherId={post.teacherId}
                maxProgress={post.maxProgress}
                progress={post.progress}
            />
            <TLessonGroup />
        </div>
    );
}