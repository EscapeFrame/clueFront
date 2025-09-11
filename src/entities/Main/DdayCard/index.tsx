import { Card, DDayText, Title, Submit } from './styles';
import { useIsUrgent, DDayCardProps } from './Dday.hooks';

export default function DDayCard({ dDay, url, title }: DDayCardProps) {
  const isUrgent = useIsUrgent(dDay);

  return (
    <Card href={url || undefined} isUrgent={isUrgent} target="_blank" rel="noopener noreferrer">
      <DDayText isUrgent={isUrgent}>D-{dDay}</DDayText>
      <Title>{title}</Title>
      {url && <Submit>제출 &gt;</Submit>}
    </Card>
  );
}