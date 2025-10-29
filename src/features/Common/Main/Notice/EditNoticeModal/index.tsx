import { useState, useRef, useEffect } from 'react';
import { Modal } from '@/entities/UI/Modal';
import * as s from './styles';
import { noticeApi } from '@/features/Common/Main/api/useNotice';
import { PostNoticeItem, DetailNoticeItem, NoticeDocument } from '@/shared/types/notice';
import AttachmentBox from '@/entities/UI/Attachment';

interface EditNoticeModalProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData: DetailNoticeItem;
}

export interface Attachment {
  id: string; // 고유 ID 추가
  type: 'file' | 'link';
  name: string;
  url?: string;
  file?: File;
  isNew?: boolean; // 새로 추가된 항목인지 여부
}

export default function EditNoticeModal({
  onClose,
  onSuccess,
  initialData,
}: EditNoticeModalProps) {
  const [type, setType] = useState<'SCHOOL' | 'SCHEDULE' | 'SERVICE'>('SCHOOL');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [deletedAttachmentIds, setDeletedAttachmentIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 파일 업로드 모달 관련 상태
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [tempFiles, setTempFiles] = useState<Attachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 링크 모달 관련 상태
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkInput, setLinkInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setType(initialData.type as 'SCHOOL' | 'SCHEDULE' | 'SERVICE');
      setTitle(initialData.title);
      setContent(initialData.content);
      const existingAttachments = initialData.noticeDocuments.map((doc: NoticeDocument) => ({
        id: doc.noticeDocumentId,
        type: doc.type.toLowerCase() as 'file' | 'link',
        name: doc.title,
        url: doc.type === 'LINK' ? doc.title : undefined,
        isNew: false,
      }));
      setAttachments(existingAttachments);
    }
  }, [initialData]);

  const handleSetAttachments = (newAttachments: Attachment[] | ((prev: Attachment[]) => Attachment[])) => {
    const oldAttachments = attachments;
    const updatedAttachments = typeof newAttachments === 'function' ? newAttachments(oldAttachments) : newAttachments;

    const deleted = oldAttachments.filter(oldAtt => !oldAtt.isNew && !updatedAttachments.some(newAtt => newAtt.id === oldAtt.id));
    setDeletedAttachmentIds(prev => [...prev, ...deleted.map(d => d.id)]);

    setAttachments(updatedAttachments);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newFiles: Attachment[] = Array.from(files).map((f) => ({
      id: crypto.randomUUID(),
      type: 'file' as const,
      name: f.name,
      file: f,
      isNew: true,
    }));
    setTempFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files?.length)
      handleFileSelect({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleUploadModalComplete = () => {
    if (!tempFiles.length) return;
    setAttachments((prev) => [...prev, ...tempFiles]);
    setTempFiles([]);
    setIsFileModalOpen(false);
  };

  const handleUploadModalClose = () => {
    setTempFiles([]);
    setIsFileModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    // 1. 삭제 API 호출
    if (deletedAttachmentIds.length > 0) {
      try {
        await Promise.all(
          deletedAttachmentIds.map(docId => noticeApi.deleteNoticeDocument(initialData.noticeId, docId))
        );
      } catch (error) {
        console.error('기존 첨부파일 삭제 중 오류 발생:', error);
        // 여기서 에러 처리를 할 수 있지만, 일단 수정은 계속 진행되도록 둡니다.
      }
    }

    const filesToUpload = attachments
      .filter((att) => att.type === 'file' && att.file && att.isNew)
      .map((att) => att.file as File);

    const urlsToUpload = attachments
      .filter((att) => att.type === 'link' && att.url && att.isNew)
      .map((att) => ({ title: att.name, value: att.url as string }));

    const metadata: PostNoticeItem['metadata'] = {
      type,
      title,
      content,
      fileInfo: filesToUpload.map((file) => ({ title: file.name })),
      urls: urlsToUpload,
    };

    try {
      const result = await noticeApi.patchNotice({ noticeId: initialData.noticeId, metadata, files: filesToUpload});

      if (typeof result === 'number' && result >= 400) {
        alert(`공지사항 수정에 실패했습니다. (에러코드: ${result})`);
      } else {
        alert(`공지사항이 성공적으로 수정되었습니다.`);
        onSuccess();
      }
    } catch (error) {
      console.error('공지사항 수정 오류:', error);
      alert(`공지사항 수정 중 오류가 발생했습니다.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkSubmit = () => {
    const url = linkInput.trim();
    if (!url) return;

    try {
      new URL(url);
    } catch {
      alert('유효하지 않은 URL 형식입니다.');
      return;
    }

    setAttachments((prev) => [...prev, { id: crypto.randomUUID(), type: 'link', name: url, url, isNew: true }]);
    setIsLinkModalOpen(false);
    setLinkInput('');
  };

  return (
    <Modal
      title="공지/안내 내용 수정"
      notes="default"
      onClose={onClose}
      buttons={[
        { text: '취소', type: 1, onClick: onClose },
        {
          text: '저장',
          type: 0,
          onClick: handleSubmit,
          disabled: isSubmitting,
        },
      ]}
    >
      <s.Form onSubmit={(e) => e.preventDefault()}>
        <s.FormRow>
          <s.Label>종류</s.Label>
          <s.RadioGroup>
            <label>
              <input type="radio" value="SCHOOL" checked={type === 'SCHOOL'} onChange={(e) => setType(e.target.value as typeof type)} /> 학교공지
            </label>
            <label>
              <input type="radio" value="SCHEDULE" checked={type === 'SCHEDULE'} onChange={(e) => setType(e.target.value as typeof type)} /> 일정안내
            </label>
            <label>
              <input type="radio" value="SERVICE" checked={type === 'SERVICE'} onChange={(e) => setType(e.target.value as typeof type)} /> 서비스공지
            </label>
          </s.RadioGroup>
        </s.FormRow>
        <s.FormRow>
          <s.Label>제목</s.Label>
          <s.Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />
        </s.FormRow>
        <s.FormRow>
          <s.Label>본문</s.Label>
          <s.Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력하세요" />
        </s.FormRow>
        <s.FormRow>
          <AttachmentBox attachments={attachments} setAttachments={handleSetAttachments} openUploadModal={() => setIsFileModalOpen(true)} openLinkModal={() => setIsLinkModalOpen(true)} />
        </s.FormRow>
      </s.Form>
      {isFileModalOpen && (
        <Modal title="파일 업로드" onClose={handleUploadModalClose} buttons={[{ text: '취소', type: 1, onClick: handleUploadModalClose }, { text: '완료', type: 0, onClick: handleUploadModalComplete }]}>
          <s.FileUploadArea isDragOver={isDragOver} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
            {isDragOver ? '여기에 파일을 놓으세요!' : '파일을 끌어다 놓거나 클릭하여 업로드하세요.'}
          </s.FileUploadArea>
          <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} style={{ display: 'none' }} />
          {tempFiles.length > 0 && (<ul>{tempFiles.map((f) => (<li key={f.id}>{f.name}</li>))}</ul>)}
        </Modal>
      )}
      {isLinkModalOpen && (
        <Modal title="링크 첨부" notes="url" onClose={() => setIsLinkModalOpen(false)} buttons={[{ text: '등록', type: 0, onClick: handleLinkSubmit }, { text: '닫기', type: 1, onClick: () => setIsLinkModalOpen(false) }]} placeholder="https://example.com" inputValue={linkInput} onInputChange={(e) => setLinkInput(e.target.value)} />
      )}
    </Modal>
  );
}

