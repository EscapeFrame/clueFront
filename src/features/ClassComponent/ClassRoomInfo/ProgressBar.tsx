import React from "react";
import styles from "@/shared/css/Class/ClassRoomInfo/ProgressBar.module.css";

interface ProgressBarProps {
  maxProgress: number;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ maxProgress, progress }) => {
  // 진행값 방어 처리
  const safeProgress = Math.min(Math.max(progress, 0), maxProgress);
  const progressPercent = (safeProgress / maxProgress) * 100;

  return (
    <div className={styles.progressBarWrapper}>
      <div
        className={styles.progress}
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;