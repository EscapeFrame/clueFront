import { useParams, useSearchParams } from 'react-router-dom';

import Navbar from "@/widgets/Navbar";
import ClassRoomInfo from '@/features/ClassComponent/classRoomInfo/ClassRoomInfo';
import LessonGroup from '@/features/ClassComponent/classRoomInfo/LessonGroup';
import { Posts } from '@/shared/theme/ClassRoomInfoTheme';

export default function ClassRoom() {
    const { classId } = useParams<{ classId: string }>();
    const [searchParams] = useSearchParams();
    const viewParam = searchParams.get('view') || '수업';
  
    const post = Posts.find(p => p.classId === classId);
    if (!post) return <div>404 - 클래스를 찾을 수 없습니다</div>;  // 404 메시지 추가
  
    return (
        <>
            <Navbar />
            <ClassRoomInfo 
                classId={post.classId}
                title={post.title}
                description={post.description}
                teacherId={post.teacherId}
                maxProgress={post.maxProgress}
                progress={post.progress}
            />
            <LessonGroup />
        </>
    );
}