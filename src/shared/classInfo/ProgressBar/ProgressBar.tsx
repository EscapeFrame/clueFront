import React from "react";
import { ProgressBarWrapper, Progress } from "./styles";

interface ProgressBarProps {
  maxProgress: number;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ maxProgress, progress }) => {
  const safeProgress = Math.min(Math.max(progress, 0), maxProgress);
  const progressPercent = (safeProgress / maxProgress) * 100;

  return (
    <ProgressBarWrapper>
      <Progress style={{ width: `${progressPercent}%` }} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;