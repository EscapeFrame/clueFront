import * as s from "./styles";

interface ProgressBarProps {
  maxProgress: number;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ maxProgress, progress }) => {
  const safeProgress = Math.min(Math.max(progress, 0), maxProgress);
  const progressPercent = (safeProgress / maxProgress) * 100;

  return (
    <s.Container>
      <s.Label>
        진행률: {safeProgress}강 / {maxProgress}강
      </s.Label>
      <s.BarWrapper>
        <s.Progress style={{ width: `${progressPercent}%` }} />
      </s.BarWrapper>
    </s.Container>
  );
};

export default ProgressBar;