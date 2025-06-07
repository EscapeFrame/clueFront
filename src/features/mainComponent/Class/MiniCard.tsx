import styles from '@/shared/css/Home/Class/GoToClass.module.css';

interface MiniCardProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export function MiniCard({ title, isActive, onClick }: MiniCardProps) {
  return (
    <div
      className={`${styles.miniCard} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <span>{title}</span>
    </div>
  );
}