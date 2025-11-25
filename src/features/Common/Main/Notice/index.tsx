import { useState, useMemo } from 'react';
import NoticeCard from '@/entities/Main/NoticeCard';
import * as s from './styles';
import { NoticeItem } from '@/shared/types/notice';
import { DetailNoticeItem } from '@/shared/types/notice';
import { useNoticesQuery, categorizeNotices } from '@/features/Common/Main/api/useNoticeQuery';
import AddNoticeModal from '@/features/Common/Main/Notice/AddNoticeModal';
import NoticeDetailModal from '@/features/Common/Main/Notice/DetailNoticeModal';
import EditNoticeModal from '@/features/Common/Main/Notice/EditNoticeModal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/shared/model/userState';
import { useQueryClient } from '@tanstack/react-query';

export default function Notice() {
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [noticeToEdit, setNoticeToEdit] = useState<DetailNoticeItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const user = useRecoilValue(userState);
  const isTeacher = !!user && user.role === 'TEACHER';
  const queryClient = useQueryClient();

  const { data: notices = [], isLoading: loading, error } = useNoticesQuery();

  // sort notices by createdAt desc (newest first) and categorize
  const { serviceNotices, schoolNotices, scheduleNotices } = useMemo(() => {
    const sortDesc = (a: NoticeItem, b: NoticeItem) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    const categorized = categorizeNotices(notices);

    return {
      serviceNotices: [...categorized.serviceNotices].sort(sortDesc),
      schoolNotices: [...categorized.schoolNotices].sort(sortDesc),
      scheduleNotices: [...categorized.scheduleNotices].sort(sortDesc),
    };
  }, [notices]);

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['notices'] });
  };

  const handleStartEdit = (noticeDetail: DetailNoticeItem) => {
    setNoticeToEdit(noticeDetail);
    setSelectedNotice(null); // 상세 모달 닫기
  };

  const handleEditSuccess = () => {
    setNoticeToEdit(null); // 수정 모달 닫기
    refetch(); // 목록 새로고침
  };


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
            error={error?.message || null}
            onSelect={setSelectedNotice}
          />
          <NoticeCard
            cardTitle="학교공지"
            notices={schoolNotices}
            loading={loading}
            error={error?.message || null}
            onSelect={setSelectedNotice}
          />
          <NoticeCard
            cardTitle="일정안내"
            notices={scheduleNotices}
            loading={loading}
            error={error?.message || null}
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
          onStartEdit={handleStartEdit}
          onSuccess={() => {
            refetch();
            setSelectedNotice(null);
          }}
        />
      )}

      {noticeToEdit && (
        <EditNoticeModal
          initialData={noticeToEdit}
          onClose={() => setNoticeToEdit(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </s.TopContainer>
  );
}