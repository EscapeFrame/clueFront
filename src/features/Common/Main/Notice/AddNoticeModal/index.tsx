import { useState, useRef, useEffect } from 'react';
import { Modal } from '@/entities/UI/Modal';
import * as s from './styles';
import { noticeApi } from '@/features/Common/Main/api/useNotice';
import { PostNoticeItem, DetailNoticeItem } from '@/shared/types/notice';
import AttachmentBox from '@/entities/UI/Attachment';

interface AddNoticeModalProps {
  onClose: () => void;
  onSuccess: () => void;
  isEdit?: boolean;
  initialData?: DetailNoticeItem | null;
}

export interface Attachment {
  id: string;
  type: 'file' | 'link';
  name: string;
  url?: string;
  file?: File;
  isNew?: boolean;
}

export default function AddNoticeModal({
  onClose,
  onSuccess,
  isEdit = false,
  initialData = null,
}: AddNoticeModalProps) {
  const [type, setType] = useState<'SCHOOL' | 'SCHEDULE' | 'SERVICE'>('SCHOOL');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
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
    if (isEdit && initialData) {
      setType(initialData.type as 'SCHOOL' | 'SCHEDULE' | 'SERVICE');
      setTitle(initialData.title);
      setContent(initialData.content);
      const existingAttachments = initialData.noticeDocuments.map(doc => ({
        type: doc.type.toLowerCase() as 'file' | 'link',
        id: doc.noticeDocumentId,
        name: doc.title,
        // For existing files, we don't have the File object, just metadata.
        // For links, we'll need to fetch the URL if not readily available.
        // This implementation assumes title is enough for display.
        url: doc.type === 'LINK' ? doc.title : undefined,
      }));
      setAttachments(existingAttachments);
    }
  }, [isEdit, initialData]);

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

    const filesToUpload = attachments
      .filter((att) => att.type === 'file' && att.file)
      .map((att) => att.file as File);

    const urlsToUpload = attachments
      .filter((att) => att.type === 'link' && att.url)
      .map((att) => ({ title: att.name, value: att.url as string }));

    const metadata: PostNoticeItem['metadata'] = {
      type,
      title,
      content,
      fileInfo: filesToUpload.map((file) => ({ title: file.name })),
      urls: urlsToUpload,
    };

    console.log('전송할 메타데이터:', metadata);
    console.log('전송할 파일들:', filesToUpload);
    console.log('전송할 링크들:', urlsToUpload);
    console.log('file갯수', filesToUpload.length);
    console.log('fileTitle갯수', metadata.fileInfo);

    try {
      let result;
      if (isEdit && initialData) {
        // In edit mode, we only send newly added files.
        // The API should handle keeping old files if they are not in the new file list.
        // This part might need adjustment based on backend implementation for file updates.
        result = await noticeApi.patchNotice({ noticeId: initialData.noticeId, metadata, files: filesToUpload });
      } else {
        result = await noticeApi.postNotice({ metadata, files: filesToUpload });
      }

      if (typeof result === 'number' && result >= 400) {
        alert(`공지사항 ${isEdit ? '수정' : '등록'}에 실패했습니다. (에러코드: ${result})`);
      } else {
        alert(`공지사항이 성공적으로 ${isEdit ? '수정' : '등록'}되었습니다.`);
        onSuccess();
      }
    } catch (error) {
      console.error('공지사항 등록 오류:', error);
      alert(`공지사항 ${isEdit ? '수정' : '등록'} 중 오류가 발생했습니다.`);
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
      title={isEdit ? "공지/안내 내용 수정" : "공지/안내 내용 작성"}
      notes="default"
      onClose={onClose}
      buttons={[
        { text: '취소', type: 1, onClick: onClose },
        {
          text: isEdit ? '저장' : '등록',
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
              <input
                type="radio"
                value="SCHOOL"
                checked={type === 'SCHOOL'}
                onChange={(e) => setType(e.target.value as typeof type)}
              />
              학교공지
            </label>
            <label>
              <input
                type="radio"
                value="SCHEDULE"
                checked={type === 'SCHEDULE'}
                onChange={(e) => setType(e.target.value as typeof type)}
              />
              일정안내
            </label>
            <label>
              <input
                type="radio"
                value="SERVICE"
                checked={type === 'SERVICE'}
                onChange={(e) => setType(e.target.value as typeof type)}
              />
              서비스공지
            </label>
          </s.RadioGroup>
        </s.FormRow>
        <s.FormRow>
          <s.Label>제목</s.Label>
          <s.Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </s.FormRow>
        <s.FormRow>
          <s.Label>본문</s.Label>
          <s.Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </s.FormRow>
        <s.FormRow>
          <AttachmentBox
            attachments={attachments}
            setAttachments={setAttachments}
            openUploadModal={() => setIsFileModalOpen(true)}
            openLinkModal={() => setIsLinkModalOpen(true)}
          />
        </s.FormRow>
      </s.Form>
      {isFileModalOpen && (
        <Modal
          title="파일 업로드"
          onClose={handleUploadModalClose}
          buttons={[
            { text: '취소', type: 1, onClick: handleUploadModalClose },
            { text: '완료', type: 0, onClick: handleUploadModalComplete },
          ]}
        >
          <s.FileUploadArea
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {isDragOver
              ? '여기에 파일을 놓으세요!'
              : '파일을 끌어다 놓거나 클릭하여 업로드하세요.'}
          </s.FileUploadArea>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          {tempFiles.length > 0 && (
            <ul>
              {tempFiles.map((f) => (
                <li key={f.id}>{f.name}</li>
              ))}
            </ul>
          )}
        </Modal>
      )}
      {isLinkModalOpen && (
        <Modal
          title="링크 첨부"
          notes="url"
          onClose={() => setIsLinkModalOpen(false)}
          buttons={[
            { text: '등록', type: 0, onClick: handleLinkSubmit },
            { text: '닫기', type: 1, onClick: () => setIsLinkModalOpen(false) },
          ]}
          placeholder="https://example.com"
          inputValue={linkInput}
          onInputChange={(e) => setLinkInput(e.target.value)}
        />
      )}
    </Modal>
  );
}
