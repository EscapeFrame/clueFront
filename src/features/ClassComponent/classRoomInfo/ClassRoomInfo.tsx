import styles from '@/shared/css/Class/ClassRoomInfo/Info.module.css';

import { Posts } from '@/shared/theme/ClassRoomInfoTheme';
import ProgressBar from "./ProgressBar";
import { FaUser } from "react-icons/fa6";

type ClassHeaderProps = {
    classId: string;
    title: string;
    description: string;
    teacherId: string;
    maxProgress: number;
    progress: number;
};
  
export default function ClassRoomInfo({
  classId,
  title,
  description,
  teacherId,
  maxProgress,
  progress,
}: ClassHeaderProps) {

  // 만약 Posts에서 진짜 데이터를 받아야 하면 아래처럼 처리 (optional)
  const post = Posts.find(p => p.classId === classId);

  // post가 없으면 props로 받은 값 사용 (fallback)
  const usedMaxProgress = post?.maxProgress ?? maxProgress;
  const usedProgress = post?.progress ?? progress;

  return (
    <div className={styles.classHeader}>
      <div className={styles.classInfo}>
        <p className={styles.TittleFont}>{title}</p>
        <p className={styles.BodyFont}>{description}</p>
        <p className={styles.BodyFont}><FaUser />&nbsp;{teacherId}</p>
        <p className={styles.ProgressFont}>진행률: {usedProgress}강 / {usedMaxProgress}강</p>
        <ProgressBar 
          maxProgress={usedMaxProgress}
          progress={usedProgress}
        />
      </div>
      <img src="/Paletto/Haeyul.png" alt="haeyul" className={styles.img} />
    </div>
  );
}