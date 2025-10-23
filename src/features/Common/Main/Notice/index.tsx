import { useState } from 'react';
import NoticeCard from '@/entities/Main/NoticeCard';
import { Modal } from '@/entities/UI/Modal';
import * as s from './styles';
import { NoticeItem } from '@/shared/types/notice';
import { useNotices } from '@/features/Common/Main/hooks/useNotice'; // ✅ useNotices 가져오기

export default function Notice() {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const {
    serviceNotices,
    schoolNotices,
    scheduleNotices,
    loading,
    error,
  } = useNotices();

  return (
    <s.TopContainer>
      <s.Container>
        <s.Title>공지안내</s.Title>
        <s.Explain>학교의 소식을 빠르게 알아보세요!</s.Explain>
        <s.Row>
          <NoticeCard
            cardTitle="서비스공지"
            notices={serviceNotices}
            loading={loading}
            error={error}
            onSelect={setSelectedNotice}
          />
          <NoticeCard
            cardTitle="학교공지"
            notices={schoolNotices}
            loading={loading}
            error={error}
            onSelect={setSelectedNotice}
          />
          <NoticeCard
            cardTitle="일정안내"
            notices={scheduleNotices}
            loading={loading}
            error={error}
            onSelect={setSelectedNotice}
          />
        </s.Row>
      </s.Container>

      {selectedNotice && (
        <Modal
          title={selectedNotice.title}
          notes="default"
          onClose={() => setSelectedNotice(null)}
          buttons={[
            {
              text: '닫기',
              type: 0,
              width: '100%',
              onClick: () => setSelectedNotice(null),
            },
          ]}
        >
          <p>{selectedNotice.content}</p>
        </Modal>
      )}
    </s.TopContainer>
  );
}