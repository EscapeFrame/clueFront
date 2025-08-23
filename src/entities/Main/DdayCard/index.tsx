import { Card, DDayText, Title, Content, Submit } from './styles';
import { useDDayCard, useIsUrgent, DDayCardProps } from './Dday.hooks';

export default function DDayCard({ dDay, content, url, title }: DDayCardProps) {
  const { trimmedContent } = useDDayCard(content);
  const isUrgent = useIsUrgent(dDay);

  return (
    <Card href={url || undefined} isUrgent={isUrgent} target="_blank" rel="noopener noreferrer">
      <DDayText isUrgent={isUrgent}>D{dDay}</DDayText>
      <Title>{title}</Title>
      <Content>{trimmedContent}</Content>
      {url && <Submit>제출 &gt;</Submit>}
    </Card>
  );
}