import { useEffect } from 'react';
import { Modal } from '@/entities/UI/Modal';
import * as s from './styles';
import { useNoticeDetail } from '@/features/Common/Main/hooks/useNotice';
import { noticeApi } from '@/features/Common/Main/api/useNotice';
import { NoticeDocument } from '@/shared/types/notice';
import dayjs from 'dayjs';

interface NoticeDetailModalProps {
  noticeId: string;
  onClose: () => void;
}

export default function NoticeDetailModal({ noticeId, onClose }: NoticeDetailModalProps) {
  const { notice, loading, error, fetchNoticeDetail } = useNoticeDetail();

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

  if (loading) {
    return (
      <Modal
        title="공지사항 상세"
        onClose={onClose}
        buttons={[{ text: '닫기', type: 1, onClick: onClose }]}
      >
        <s.LoadingText>공지사항을 불러오는 중...</s.LoadingText>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal
        title="공지사항 상세"
        onClose={onClose}
        buttons={[{ text: '닫기', type: 1, onClick: onClose }]}
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
        buttons={[{ text: '닫기', type: 1, onClick: onClose }]}
      >
        <s.EmptyText>공지사항을 찾을 수 없습니다.</s.EmptyText>
      </Modal>
    );
  }

  const formattedDate = dayjs(notice.createdAt).format('YYYY년 MM월 DD일 HH:mm');

  return (
    <Modal
      title="공지사항 상세"
      onClose={onClose}
      buttons={[{ text: '닫기', type: 1, onClick: onClose }]}
    >
      <s.ModalContentWrapper>
        <s.ModalTitle>{notice.title}</s.ModalTitle>
        <s.ModalMeta>
          <s.NoticeType type={notice.type}>{notice.type}</s.NoticeType>
          <span>{formattedDate}</span>
        </s.ModalMeta>
        <s.ModalText>{notice.content}</s.ModalText>

        {notice.noticeDocuments && notice.noticeDocuments.length > 0 && (
          <s.AttachmentsSection>
            <s.AttachmentsTitle>첨부파일 및 링크</s.AttachmentsTitle>
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
  );
}
