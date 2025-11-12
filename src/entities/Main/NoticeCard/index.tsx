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
        <s.CardHeader>
          <s.Title>{cardTitle}</s.Title>
        </s.CardHeader>
        <s.ErrorText>{error}</s.ErrorText>
      </s.CardContainer>
    );
  }

  return (
    <s.CardContainer>
      {notices.map((notice) => (
        <s.ListItem key={notice.noticeId} onClick={() => onSelect(notice)}>
          <s.Title>수업코드</s.Title>
          <s.ItemTitle>
            {notice.title}
            <IoCopyOutline
              style={{ marginLeft: '8px', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(notice.title)
                  .then(() => alert('클립보드에 복사되었습니다!'))
                  .catch(() => alert('복사에 실패했습니다.'));
              }}
            />
          </s.ItemTitle>
        </s.ListItem>
      ))}
    </s.CardContainer>

  );
}