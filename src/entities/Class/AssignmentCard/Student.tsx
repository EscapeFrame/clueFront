import React, { useState } from 'react';
import * as s from './styles';
import { LuClock4 } from 'react-icons/lu';
import { FaRegFile, FaXmark } from 'react-icons/fa6';
import { AssignmentCardProps, AssignmentFileType } from '@/shared/types/Class/Assignment/Attachment';
import { differenceInDays, parseISO } from 'date-fns';
import Button from '@/entities/UI/Button';
import { Modal } from '@/entities/UI/Modal';
import { SubmitAssignment, DeleteAssignment } from '../api';
import { SlidePanel } from '@/entities/UI/SlidePanel';
import { MdOutlineFileUpload } from 'react-icons/md';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  file?: File;
}

function isAssignmentFileType(f: any): f is AssignmentFileType {
  return f && typeof f === 'object' && 'fileId' in f && 'fileName' in f;
}

export function AssignmentCard({ data, updateAssignment }: AssignmentCardProps) {
  const [isSubmitted, setIsSubmitted] = useState(data.isSubmitted);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    (data.files ?? []).map(f =>
      isAssignmentFileType(f)
        ? { id: String(f.fileId), name: f.fileName, size: `${f.fileSize} MB` }
        : { id: crypto.randomUUID(), name: String(f), size: '' }
    )
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [tempFiles, setTempFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // 파일 업로드
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      file,
    }));
    if (newFiles.length) setTempFiles(prev => [...prev, ...newFiles]);
  };

  const handleSubmit = async () => {
    if (!uploadedFiles.length || !uploadedFiles[0].file) return alert('업로드된 파일이 없습니다.');
    try {
      setIsSubmitting(true);
      await SubmitAssignment(String(data.id), uploadedFiles[0].file);
      setIsSubmitted(true);
      updateAssignment(data.id, { isSubmitted: true });
      alert('과제 제출 완료');
      setShowUploadModal(false);
    } catch (err) {
      console.error('과제 제출 실패:', err);
    }
  };

  const handleResubmit = async () => {
    try {
      setIsResubmitting(true);
      await DeleteAssignment(String(data.id));
      setIsSubmitted(false);
      updateAssignment(data.id, { isSubmitted: false });
      alert('제출 취소 완료');
    } catch (e) {
      alert('제출 취소 실패');
      console.error(e);
    }
  };

  const renderDeadlineOrSubmission = () => {
    if (isSubmitted)
      return (
        <s.InfoItem>
          <LuClock4 /> 제출 시간: {data.submissionDate ?? '없음'}
        </s.InfoItem>
      );
    const daysLeft = differenceInDays(parseISO(data.deadline), new Date());
    return (
      <s.InfoItem>
        <LuClock4 /> 마감까지 남은 일수: {daysLeft > 0 ? daysLeft : 0}일
      </s.InfoItem>
    );
  };

  // 파일 업로드 모달 닫기
  const handleUploadModalClose = () => {
    setTempFiles([]);
    setShowUploadModal(false);
  };

  // 파일 업로드 모달 완료
  const handleUploadModalComplete = () => {
    setUploadedFiles(tempFiles);
    setShowUploadModal(false);
  };

  // 드래그 앤 드롭 핸들러
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
    if (files && files.length > 0) {
      handleFileUpload({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <>
      <s.CardContainer onClick={() => setShowDetailsPanel(true)}>
        <s.FileListSection>
          {uploadedFiles.map(file => (
            <s.FileItem
              key={file.id}
              onClick={() =>
                !isSubmitted && alert(`파일명: ${file.name}\n크기: ${file.size}`)
              }
            >
              <s.FileInfoContainer>
                <FaRegFile />
                <div>
                  <s.FileNameText>{file.name}</s.FileNameText>
                  {file.size && <s.FileSizeText>{file.size}</s.FileSizeText>}
                </div>
              </s.FileInfoContainer>
              {!isSubmitted && (
                <s.FileRemoveButton
                  onClick={e => {
                    e.stopPropagation();
                    setUploadedFiles(prev => prev.filter(f => f.id !== file.id));
                  }}
                >
                  <FaXmark />
                </s.FileRemoveButton>
              )}
            </s.FileItem>
          ))}
        </s.FileListSection>

        <s.ButtonSection>
          {isSubmitted ? (
            <Button
              type={1}
              text="다시 제출하기"
              onClick={handleResubmit}
              disabled={isResubmitting}
            />
          ) : (
            <>
              <Button type={0} text="파일 업로드" onClick={() => setShowUploadModal(true)} />
              <Button type={1} text="과제 제출하기" onClick={handleSubmit} disabled={isSubmitting} />
            </>
          )}
        </s.ButtonSection>
      </s.CardContainer>

      {showUploadModal && (
        <Modal
          title="파일 업로드"
          onClose={handleUploadModalClose}
          buttons={[
            { text: '닫기', type: 0, onClick: handleUploadModalClose },
            { text: '완료', type: 1, onClick: handleUploadModalComplete },
          ]}
        >
          <div>
            {/* 드래그 앤 드롭 영역 */}
            <s.FileUploadArea
              isDragOver={isDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <MdOutlineFileUpload size={60} /> <br />
              {isDragOver ? '여기에 파일을 놓으세요!' : '파일을 끌어다 놓거나 클릭하여 업로드하세요.'}
            </s.FileUploadArea>
            <input
              ref={fileInputRef}
              id="fileUpload"
              type="file"
              multiple
              onChange={handleFileUpload}
              accept="*"
              style={{ display: 'none' }}
            />
            <s.FileList>
              {tempFiles.length === 0 ? (
                <p>파일이 없습니다</p>
              ) : (
                <ul>
                  {tempFiles.map(file => (
                    <li key={file.id}>{file.name}</li>
                  ))}
                </ul>
              )}
            </s.FileList>
          </div>
        </Modal>
      )}

      {showDetailsPanel && (
        <SlidePanel
          isOpen={showDetailsPanel}
          onClose={() => setShowDetailsPanel(false)}
          title={data.title}
        >
          <div style={{ lineHeight: 1.6 }}>
            <p>
              <strong>설명:</strong> {data.description}
            </p>
            <p>
              <strong>마감일:</strong> {data.deadline}
            </p>
            <p>
              <strong>진행 기간:</strong> {data.duringDate} ~ {data.endDate}
            </p>
            <p>
              <strong>남은 시간:</strong> {data.remainingTime}
            </p>
            <p>
              <strong>제출 여부:</strong>{' '}
              {isSubmitted
                ? `제출함 (제출일: ${data.submissionDate ?? '없음'})`
                : '미제출'}
            </p>
            {uploadedFiles.length > 0 && (
              <>
                <strong>업로드한 파일 목록:</strong>
                <ul>
                  {uploadedFiles.map(f => (
                    <li key={f.id}>
                      {f.name} {f.size && `(${f.size})`}
                    </li>
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