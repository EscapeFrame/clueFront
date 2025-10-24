import { useState } from 'react';
import { Modal } from '@/entities/UI/Modal';
import * as s from './styles';
import { noticeApi } from '@/features/Common/Main/api/useNotice';
import { PostNoticeItem } from '@/shared/types/notice';

interface AddNoticeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddNoticeModal({
  onClose,
  onSuccess,
}: AddNoticeModalProps) {
  const [type, setType] = useState<'SCHOOL' | 'SCHEDULE' | 'SERVICE'>('SCHOOL');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<{ value: string; title: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddUrl = () => {
    setUrls([...urls, { value: '', title: '' }]);
  };

  const handleRemoveUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleUrlChange = (
    index: number,
    field: 'value' | 'title',
    value: string,
  ) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    const metadata: PostNoticeItem['metadata'] = {
      type,
      title,
      content,
      fileInfo: files.map((file) => ({ title: file.name })),
      urls: urls.filter((url) => url.value.trim() !== ''), // 빈 URL은 제외
    };

    console.log('전송할 메타데이터:', metadata);

    try {
      const result = await noticeApi.postNotice({ metadata, files });
      if (typeof result === 'number' && result >= 400) {
        alert(`공지사항 등록에 실패했습니다. (에러코드: ${result})`);
      } else {
        alert('공지사항이 성공적으로 등록되었습니다.');
        onSuccess();
      }
    } catch (error) {
      console.error('공지사항 등록 오류:', error);
      alert('공지사항 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="공지/안내 내용 작성"
      notes="default"
      onClose={onClose}
      buttons={[
        { text: '취소', type: 1, onClick: onClose },
        {
          text: '등록',
          type: 0,
          onClick: handleSubmit,
          disabled: isSubmitting,
        },
      ]}
    >
      <s.Form>
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
          <s.Label>내용</s.Label>
          <s.Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </s.FormRow>
        <s.FormRow>
          <s.Label>파일 첨부</s.Label>
          <s.Input type="file" multiple onChange={handleFileChange} />
        </s.FormRow>
        <s.FormRow>
          <s.Label>
            URL 링크
            <s.AddButton type="button" onClick={handleAddUrl}>
              +
            </s.AddButton>
          </s.Label>
          {urls.map((url, index) => (
            <s.UrlInputGroup key={index}>
              <s.Input
                type="text"
                value={url.title}
                onChange={(e) => handleUrlChange(index, 'title', e.target.value)}
                placeholder="링크 제목"
              />
              <s.Input
                type="text"
                value={url.value}
                onChange={(e) => handleUrlChange(index, 'value', e.target.value)}
                placeholder="https://example.com"
              />
              <s.RemoveButton type="button" onClick={() => handleRemoveUrl(index)}>
                -
              </s.RemoveButton>
            </s.UrlInputGroup>
          ))}
        </s.FormRow>
      </s.Form>
    </Modal>
  );
}
