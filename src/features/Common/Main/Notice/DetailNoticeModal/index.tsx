import { useEffect, useState } from 'react';
import { Modal } from '@/entities/UI/Modal';
import * as s from './styles';
import { useNoticeDetail, useNoticeAttachments } from '@/features/Common/Main/hooks/useNotice';
import { noticeApi } from '@/features/Common/Main/api/useNotice';
import { NoticeDocument, DetailNoticeItem } from '@/shared/types/notice';
import { ButtonData } from '@/shared/types/modal';
import { IoClose } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { userState } from '@/shared/model/userState';

interface NoticeDetailModalProps {
  noticeId: string;
  onClose: () => void;
  onSuccess: () => void; // 수정/삭제 성공 시 목록 새로고침을 위한 콜백
  onStartEdit: (notice: DetailNoticeItem) => void; // 수정 시작 콜백
}

export default function NoticeDetailModal({
  noticeId,
  onClose,
  onSuccess,
  onStartEdit,
}: NoticeDetailModalProps) {
  const user = useRecoilValue(userState);
  const isTeacher = !!user && user.role === 'TEACHER';
  const { notice, loading, error, fetchNoticeDetail } = useNoticeDetail(noticeId);
  const { handleAttachmentClick, handleDeleteAttachment } = useNoticeAttachments(noticeId, () => fetchNoticeDetail(noticeId));

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
      { text: '수정', type: 0, onClick: () => notice && onStartEdit(notice) },
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
                  <s.AttachmentItem key={doc.noticeDocumentId} $hasDelete={isTeacher}>
                    <div>
                      <s.AttachmentLink onClick={() => handleAttachmentClick(doc)}>
                        {doc.type === 'FILE' ? '📄 ' : '🔗 '}
                        {doc.title}
                      </s.AttachmentLink>
                    </div>
                    {isTeacher && (
                      <s.DeleteButton onClick={() => handleDeleteAttachment(doc.noticeDocumentId)}><IoClose size={16} /></s.DeleteButton>
                    )}
                  </s.AttachmentItem>
                ))}
              </s.AttachmentList>
            </s.AttachmentsSection>
          )}
        </s.ModalContentWrapper>
      </Modal>
    </>
  );
}
