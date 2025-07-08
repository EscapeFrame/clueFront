import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from "@/widgets/Navbar";
import ClassRoomInfo from '@/shared/classInfo/ClassRoomInfo';
import TLessonGroup from '@/features/ClassComponent/Teacher/ClassRoomInfo/TLessonGroup';
import { Posts } from '@/shared/theme/ClassRoomInfoTheme';
import styles from '@/shared/css/Class/ClassRoom.module.css';

export default function TClassRoom() {
    const { classId } = useParams<{ classId: string }>();
  
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