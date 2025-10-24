import { useState } from 'react';
import NoticeCard from '@/entities/Main/NoticeCard';
import * as s from './styles';
import { NoticeItem } from '@/shared/types/notice';
import { useNotices } from '@/features/Common/Main/hooks/useNotice';
import AddNoticeModal from '@/features/Common/Main/Notice/AddNoticeModal';
import NoticeDetailModal from '@/features/Common/Main/Notice/DetailNoticeModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/shared/model/userState';

export default function Notice() {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const user = useRecoilValue(userState);
  const isTeacher = !!user && (user.role === 'TCH' || user.role === 'TEACHER');

  const {
    serviceNotices,
    schoolNotices,
    scheduleNotices,
    loading,
    error,
  } = useNotices();
  const { refetch } = useNotices();

  return (
    <s.TopContainer>
      <s.Container>
        <s.InventoryHeader>
          <div>
            <s.Title>공지안내</s.Title>
            <s.Explain>학교의 소식을 빠르게 알아보세요!</s.Explain>
          </div>
          {isTeacher && (
            <s.AddButton onClick={() => setIsAddModalOpen(true)}>+</s.AddButton>
          )}
        </s.InventoryHeader>
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

      {isAddModalOpen && (
        <AddNoticeModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setIsAddModalOpen(false);
            refetch();
          }}
        />
      )}

      {selectedNotice && (
        <NoticeDetailModal
          noticeId={selectedNotice.noticeId}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </s.TopContainer>
  );
}