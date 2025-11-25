import React, { useState } from 'react';
import * as s from './styles';
import { Modal } from '@/entities/UI/Modal';
import { SlidePanel } from '@/entities/UI/SlidePanel';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import { FaRegFile, FaXmark } from 'react-icons/fa6';
import Button from '@/entities/UI/Button';
import { AssignmentCardProps, AssignmentFileType } from '@/shared/types/Class/Assignment/Attachment';
import { differenceInDays, parseISO } from 'date-fns';
import { MdOutlineFileUpload } from "react-icons/md";
import { submitFile, finalizeSubmission, cancelSubmission } from '../api';


interface UploadedFile { id: string; name: string; size: string; file?: File }

function isAssignmentFileType(f: unknown): f is AssignmentFileType {
  return typeof f === 'object' && f !== null && 'fileId' in f && 'fileName' in f;
}

export function AssignmentCard({ data, updateAssignment }: AssignmentCardProps) {
  const [isSubmitted, setIsSubmitted] = useState(data.isSubmitted);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    (data.files ?? []).map(f => isAssignmentFileType(f)
      ? { id: String(f.fileId), name: f.fileName, size: `${f.fileSize} MB` }
      : { id: crypto.randomUUID(), name: String(f), size: '' })
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [tempFiles, setTempFiles] = useState<UploadedFile[]>([]); // 업로드 중인 파일(파일 선택 후 업로드 전)
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newFiles: UploadedFile[] = [];
    for (const file of Array.from(files)) {
      newFiles.push({
        id: crypto.randomUUID(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        file,
      });
    }
    if (newFiles.length) {
      setTempFiles(prev => [...prev, ...newFiles]);
      alert('파일이 추가되었습니다.');
    }
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

  const handleSubmit = async () => {
    if (!uploadedFiles.length) return alert('파일을 먼저 업로드 해주세요.');

    const fileToSubmit = uploadedFiles[0].file;
    if (!fileToSubmit) return alert('파일 데이터가 없습니다.');

    try {
      await submitFile(String(data.assignmentId), fileToSubmit);
      await finalizeSubmission(String(data.assignmentId));
      setIsSubmitted(true);
      updateAssignment(data.assignmentId, { isSubmitted: true });
      alert('과제 제출 완료');
      setShowUploadModal(false);
    } catch {
      alert('제출 실패');
    }
  };

  const handleResubmit = async () => {
    // setIsSubmitted(false);
    // updateAssignment(data.id,{ isSubmitted: true });
    // DeleteAssignment(String(data.id)).catch(console.error)
    try {
      await cancelSubmission(String(data.assignmentId));
      setIsSubmitted(false);
      updateAssignment(data.assignmentId, { isSubmitted: false });
      alert('제출 취소 완료');
    } catch (e) {
      // setIsSubmitted(prev);
      alert('제출 취소 실패');
      console.error(e);
    }

  };

  const renderDeadlineOrSubmission = () => {
    if (isSubmitted) {
      return <s.InfoItem><LuClock4 /> 제출 시간: {data.submissionDate ?? '없음'}</s.InfoItem>;
    }

    if (!data.deadline || typeof data.deadline !== "string" || data.deadline.trim() === "") {
      return <s.InfoItem><LuClock4 /> 마감일 정보 없음</s.InfoItem>;
    }

    try {
      const parsed = parseISO(data.deadline);
      if (isNaN(parsed.getTime())) {
        return <s.InfoItem><LuClock4 /> 마감일 정보 오류</s.InfoItem>;
      }

      const daysLeft = differenceInDays(parsed, new Date());
      return <s.InfoItem><LuClock4 /> 마감까지 남은 일수: {daysLeft > 0 ? daysLeft : 0}일</s.InfoItem>;
    } catch (e) {
      console.error("Invalid deadline:", data.deadline, e);
      return <s.InfoItem><LuClock4 /> 마감일 정보 오류</s.InfoItem>;
    }
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
                  {tempFiles.map((file) => (
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