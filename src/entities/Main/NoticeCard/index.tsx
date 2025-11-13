import * as s from './styles';
import { NoticeItem } from '@/shared/types/notice';
import { IoCopyOutline } from 'react-icons/io5';

interface NoticeCardProps {
  cardTitle: string;
  notices: NoticeItem[];
  onSelect: (notice: NoticeItem) => void;
  loading?: boolean;
  error?: string | null;
}

export default function NoticeCard({
  cardTitle,
  notices,
  onSelect,
  loading = false,
  error = null,
}: NoticeCardProps) {
  // 로딩 상태
  if (loading) {
    return (
      <s.CardContainer>
        <s.CardHeader>
          <s.Title>{cardTitle}</s.Title>
        </s.CardHeader>
        <s.LoadingText>로딩 중...</s.LoadingText>
      </s.CardContainer>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <s.CardContainer>
        <s.Title>{cardTitle}</s.Title>
        <s.List>
          <s.ErrorText>{error}</s.ErrorText>
        </s.List>
      </s.CardContainer>
    );
  }

  // 데이터가 없는 경우
  if (notices.length === 0) {
    return (
      <s.CardContainer>
        <s.Title>{cardTitle}</s.Title>
        <s.List>
          <s.ErrorText>공지사항이 없습니다.</s.ErrorText>
        </s.List>
        <s.CardHeader>
          <s.Title>{cardTitle}</s.Title>
        </s.CardHeader>
        <s.ErrorText>{error}</s.ErrorText>
      </s.CardContainer>
    );
  }

  return (
    <s.CardContainer>
      <s.Title>{cardTitle}</s.Title>
      <s.List>
        {notices.map((notice) => (
          <s.ListItem key={notice.noticeId} onClick={() => onSelect(notice)}>
            <s.ItemTitle>{notice.title}</s.ItemTitle>
            <s.ItemDate>{notice.createdAt.slice(0, 10).replace(/-/g, '-')}</s.ItemDate>
          </s.ListItem>
        ))}
      </s.List>
    </s.CardContainer>
  );
}