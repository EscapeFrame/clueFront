import { MiniCard } from './Subtopic.styles';

interface MiniCardProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export function Subtopic({ title, isActive, onClick }: MiniCardProps) {
  return (
    <MiniCard isActive={isActive} onClick={onClick}>
      <span>{title}</span>
    </MiniCard>
  );
}