import { useState } from 'react';
import Customapi from '@/shared/config/api';
import * as s from './styles';
import { Modal } from '@/entities/UI/Modal';
import { SlidePanel } from '@/entities/UI/SlidePanel';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import { FaRegFile, FaXmark } from 'react-icons/fa6';
import Button from '@/entities/UI/Button';
import { AssignmentCardProps, AssignmentFileType } from '@/shared/types/classroom';
import { differenceInDays, parseISO } from 'date-fns';

interface UploadedFile { id: string; name: string; size: string; }

function isAssignmentFileType(f: any): f is AssignmentFileType {
  return f && typeof f === 'object' && 'fileId' in f && 'fileName' in f;
}

export function AssignmentCard({ data }: AssignmentCardProps) {
  const [isSubmitted, setIsSubmitted] = useState(data.isSubmitted);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    (data.files ?? []).map(f => isAssignmentFileType(f)
      ? { id: String(f.fileId), name: f.fileName, size: `${f.fileSize} MB` }
      : { id: crypto.randomUUID(), name: String(f), size: '' })
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const newFiles: UploadedFile[] = [];
    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        await Customapi.post(`/api/assignments/submit/${data.id}`, formData);
        newFiles.push({ id: crypto.randomUUID(), name: file.name, size: `${(file.size / 1024).toFixed(1)} KB` });
      } catch {
        alert(`${file.name} 업로드 실패`);
      }
    }
    if (newFiles.length) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
      alert('업로드 완료');
      setShowUploadModal(false);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFiles.length) return alert('파일을 먼저 업로드 해주세요.');
    try {
      const formData = new FormData();
      formData.append('file', uploadedFiles[0].name);
      await Customapi.post(`/api/assignments/submit/${data.id}`, formData);
      setIsSubmitted(true);
      alert('과제 제출 완료');
      setShowUploadModal(false);
    } catch {
      alert('제출 실패');
    }
  };

  const handleResubmit = () => {
    setIsSubmitted(false);
    Customapi.delete(`/api/assignments/submit/${data.id}`).catch(console.error);
  };

  const renderDeadlineOrSubmission = () => {
    if (isSubmitted) {
      return <s.InfoItem><LuClock4 /> 제출 시간: {data.submissionDate ?? '없음'}</s.InfoItem>;
    }
    const daysLeft = differenceInDays(parseISO(data.deadline), new Date());
    return <s.InfoItem><LuClock4 /> 마감까지 남은 일수: {daysLeft > 0 ? daysLeft : 0}일</s.InfoItem>;
  };

  return (
    <>
      <s.CardContainer onClick={() => setShowDetailsPanel(true)}>
        <s.CardHeader>
          <s.Title>{data.title}</s.Title>
          <s.StatusBadge variant={isSubmitted ? 'completed' : 'pending'}>
            {isSubmitted ? '제출됨' : '미제출'}
          </s.StatusBadge>
        </s.CardHeader>

        <s.InfoSection>
          <s.InfoItem><IoCalendarClearOutline /> 마감일: {data.deadline}</s.InfoItem>
          {renderDeadlineOrSubmission()}

          <s.FileListSection>
            {uploadedFiles.map(file => (
              <s.FileItem
                key={file.id}
                onClick={() => !isSubmitted && alert(`파일명: ${file.name}\n크기: ${file.size}`)}
                style={{ cursor: isSubmitted ? 'default' : 'pointer' }}
              >
                <s.FileInfoContainer>
                  <FaRegFile />
                  <div>
                    <s.FileNameText>{file.name}</s.FileNameText>
                    {file.size && <s.FileSizeText>{file.size}</s.FileSizeText>}
                  </div>
                </s.FileInfoContainer>
                {!isSubmitted && (
                  <s.FileRemoveButton onClick={e => { e.stopPropagation(); setUploadedFiles(prev => prev.filter(f => f.id !== file.id)); }}>
                    <FaXmark />
                  </s.FileRemoveButton>
                )}
              </s.FileItem>
            ))}
          </s.FileListSection>

          <s.ButtonSection>
            {isSubmitted
              ? <Button type={1} text="다시 제출하기" onClick={handleResubmit} />
              : <>
                  <Button type={0} text="파일 업로드" onClick={() => setShowUploadModal(true)} />
                  <Button type={1} text="과제 제출하기" onClick={handleSubmit} />
                </>
            }
          </s.ButtonSection>
        </s.InfoSection>
      </s.CardContainer>

      {showUploadModal && (
        <Modal
          title="파일 업로드"
          onClose={() => setShowUploadModal(false)}
          buttons={[{ text: '닫기', type: 0, onClick: () => setShowUploadModal(false) }]}
        >
          <input type="file" multiple onChange={handleFileUpload} accept="*" />
        </Modal>
      )}

      {showDetailsPanel && (
        <SlidePanel
          isOpen={showDetailsPanel}
          onClose={() => setShowDetailsPanel(false)}
          title={data.title}
          userRole="Student"
        >
          <div style={{ lineHeight: 1.6 }}>
            <p><strong>설명:</strong> {data.description}</p>
            <p><strong>마감일:</strong> {data.deadline}</p>
            <p><strong>진행 기간:</strong> {data.duringDate} ~ {data.endDate}</p>
            <p><strong>남은 시간:</strong> {data.remainingTime}</p>
            <p><strong>제출 여부:</strong> {isSubmitted ? `제출함 (제출일: ${data.submissionDate ?? '없음'})` : '미제출'}</p>
            {uploadedFiles.length > 0 && (
              <>
                <strong>업로드한 파일 목록:</strong>
                <ul>
                  {uploadedFiles.map(f => (
                    <li key={f.id}>{f.name} {f.size && `(${f.size})`}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </SlidePanel>
      )}
    </>
  );
}