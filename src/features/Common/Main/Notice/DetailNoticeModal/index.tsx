import { useEffect, useState } from 'react';
import { Modal } from '@/entities/UI/Modal';
import * as s from './styles';
import { useNoticeDetail } from '@/features/Common/Main/hooks/useNotice';
import { noticeApi } from '@/features/Common/Main/api/useNotice';
import { NoticeDocument } from '@/shared/types/notice';
import { ButtonData } from '@/shared/types/modal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/shared/model/userState';
import AddNoticeModal from '@/features/Common/Main/Notice/AddNoticeModal';

interface NoticeDetailModalProps {
  noticeId: string;
  onClose: () => void;
  onSuccess: () => void; // 수정/삭제 성공 시 목록 새로고침을 위한 콜백
}

export default function NoticeDetailModal({
  noticeId,
  onClose,
  onSuccess,
}: NoticeDetailModalProps) {
  const user = useRecoilValue(userState);
  const isTeacher = !!user && (user.role === 'TCH' || user.role === 'TEACHER');
  const { notice, loading, error, fetchNoticeDetail } = useNoticeDetail();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (noticeId) {
      fetchNoticeDetail(noticeId);
    }
  }, [noticeId, fetchNoticeDetail]);

  const handleAttachmentClick = async (document: NoticeDocument) => {
    if (document.type === 'FILE') {
      try {
        await noticeApi.downloadNoticeFile(document.noticeDocumentId, document.title);
      } catch (err) {
        alert('파일 다운로드에 실패했습니다.');
        console.error('File download error:', err);
      }
    } else if (document.type === 'LINK') {
      try {
        const link = await noticeApi.getNoticeLink(document.noticeDocumentId);
        if (typeof link === 'string') {
          window.open(link, '_blank');
        } else {
          alert('링크를 가져오는데 실패했습니다.');
        }
      } catch (err) {
        alert('링크 열기에 실패했습니다.');
        console.error('Link open error:', err);
      }
    }
  };

  let modalButtons: ButtonData[] = [];

  if (loading) {
    return (
      <Modal
        title="공지사항 상세"
        onClose={onClose}
        buttons={modalButtons}
      >
        <s.LoadingText>공지사항을 불러오는 중...</s.LoadingText>
      </Modal>
    );
  }

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    onSuccess(); // 목록 새로고침
    onClose(); // 상세 모달 닫기
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      try {
        const status = await noticeApi.deleteNotice(noticeId);
        if (status === 200) {
          alert('공지사항이 삭제되었습니다.');
          onSuccess();
          onClose();
        } else {
          alert(`공지사항 삭제에 실패했습니다. (에러코드: ${status})`);
        }
      } catch (err) {
        alert('공지사항 삭제 중 오류가 발생했습니다.');
        console.error('Notice delete error:', err);
      }
    }
  };

  // isTeacher가 true일 경우 수정 및 삭제 버튼 추가
  if (isTeacher) {
    modalButtons = [
      { text: '수정', type: 0, onClick: () => setIsEditModalOpen(true) },
      { text: '삭제', type: 2, onClick: handleDelete },
    ];
  }

  if (error) {
    return (
      <Modal
        title="공지사항 상세"
        onClose={onClose}
        buttons={modalButtons}
      >
        <s.ErrorText>{error}</s.ErrorText>
      </Modal>
    );
  }

  if (!notice) {
    return (
      <Modal
        title="공지사항 상세"
        onClose={onClose}
        buttons={modalButtons}
      >
        <s.EmptyText>공지사항을 찾을 수 없습니다.</s.EmptyText>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        title={notice.type}
        onClose={onClose}
        buttons={modalButtons}
      >
        <s.ModalContentWrapper>
          <s.ModalMeta>
            <s.Title>제목</s.Title>
            <s.ModalTitle>{notice.title}</s.ModalTitle>
            <s.Title>내용</s.Title>
            <s.ModalText>{notice.content}</s.ModalText>
          </s.ModalMeta>
          {notice.noticeDocuments && notice.noticeDocuments.length > 0 && (
            <s.AttachmentsSection>
              <s.AttachmentsTitle>파일첨부</s.AttachmentsTitle>
              <s.AttachmentList>
                {notice.noticeDocuments.map((doc) => (
                  <s.AttachmentItem key={doc.noticeDocumentId}>
                    <s.AttachmentLink onClick={() => handleAttachmentClick(doc)}>
                      {doc.type === 'FILE' ? '📄 ' : '🔗 '}
                      {doc.title}
                    </s.AttachmentLink>
                  </s.AttachmentItem>
                ))}
              </s.AttachmentList>
            </s.AttachmentsSection>
          )}
        </s.ModalContentWrapper>
      </Modal>
      {isEditModalOpen && (
        <AddNoticeModal
          isEdit
          initialData={notice}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}
