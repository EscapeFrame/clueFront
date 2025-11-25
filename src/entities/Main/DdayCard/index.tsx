import * as s from './styles';
import { useIsUrgent, DDayCardProps } from './DdayCheck';

export default function DDayCard({ dDay, url, title }: DDayCardProps) {
  const isUrgent = useIsUrgent(dDay);

  return (
    <s.Card href={url || undefined} isUrgent={isUrgent} target="_blank" rel="noopener noreferrer">
      <s.DDayText isUrgent={isUrgent}>D-{dDay}</s.DDayText>
      <s.Title>{title}</s.Title>
      {url && <s.Submit>제출 &gt;</s.Submit>}
    </s.Card>
  );
}