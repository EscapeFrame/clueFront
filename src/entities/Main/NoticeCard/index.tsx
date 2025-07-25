import * as s from './styles';
import { NoticeListItem } from './Notice.hooks';
interface NoticeCardProps {
  cardTitle: string;
  notices: NoticeListItem[];
  onSelect: (notice: NoticeListItem) => void;
}

export default function NoticeCard({ cardTitle, notices, onSelect }: NoticeCardProps) {
  return (
    <s.CardContainer>
      <s.Title>{cardTitle}</s.Title>
      <s.List>
        {notices.map((notice) => (
          <s.ListItem key={notice.id} onClick={() => onSelect(notice)}>
            <s.ItemTitle>{notice.title}</s.ItemTitle>
            <s.ItemDate>{notice.date}</s.ItemDate>
          </s.ListItem>
        ))}
      </s.List>
    </s.CardContainer>
  );
}