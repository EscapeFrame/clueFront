import React, { useState, useRef, useEffect } from 'react';
import * as s from './styles';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import { FaRegFile, FaLink, FaXmark } from 'react-icons/fa6';
import { differenceInDays, parseISO } from 'date-fns';
import { Modal } from '@/entities/UI/Modal';
import {
  submitFile,
  submitLink,
  finalizeSubmission,
  cancelSubmission,
  getAssignmentAttachments,
  deleteSubmissionAttachment, // Add this line
} from '../api';
import { getStudentSubmissionDetail } from '../api';
import AttachmentBox from '@/entities/UI/Attachment';
import AddModal from '@/entities/UI/AddModal';
import Customapi from '@/shared/config/api';
import { AxiosError } from 'axios';

interface Attachment {
  id: string;
  type: 'file' | 'link';
  name: string;
  url?: string;
  file?: File;
  isNew?: boolean;
}

interface TeacherAttachment {
  type: 'FILE' | 'LINK';
  value: string;
  originalFileName?: string;
  assignmentAttachmentId?: string;
}

export interface SubmissionAttachmentResponse {
  submissionAttachmentId: string;
  type: 'FILE' | 'LINK';
  value: string;
  originalFileName: string;
}

export interface StudentAssignmentData {
  assignmentId: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  submissionId: string;
  IsSubmitted: boolean;
  submittedAt: string | null;
  submissionAttachmentResponses: SubmissionAttachmentResponse[];
}

interface StudentAssignmentCardProps {
  data: StudentAssignmentData;
  updateAssignment: (
    assignmentId: string,
    updatedAssignment: Partial<StudentAssignmentData>,
  ) => void;
}

export function AssignmentCard({
  data,
  updateAssignment,
}: StudentAssignmentCardProps) {
  const [isSubmitted, setIsSubmitted] = useState(data.IsSubmitted);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [teacherAttachments, setTeacherAttachments] = useState<TeacherAttachment[]>([]);
  const [
    isFetchingTeacherAttachments,
    setIsFetchingTeacherAttachments,
  ] = useState(false);

  useEffect(() => {
    if (data.submissionAttachmentResponses) {
      const existingAttachments = data.submissionAttachmentResponses.map(
        (att) => ({
          id: att.submissionAttachmentId,
          type: att.type === 'FILE' ? 'file' : 'link',
          name: att.type === 'FILE' ? att.originalFileName : att.value,
          url: att.type === 'LINK' ? att.value : undefined,
          isNew: false,
        }),
      ) as Attachment[];
      setAttachments(existingAttachments);
    }
  }, [data.submissionAttachmentResponses]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newFiles: Attachment[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      type: 'file',
      name: file.name,
      file: file,
      isNew: true,
    }));
    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const handleAddLink = () => {
    if (!linkUrl) return;
    const newLink: Attachment = {
      id: crypto.randomUUID(),
      type: 'link',
      name: linkUrl,
      url: linkUrl,
      isNew: true,
    };
    setAttachments((prev) => [...prev, newLink]);
    setLinkUrl('');
    setIsLinkModalOpen(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newAttachments = attachments.filter((att) => att.isNew);
      for (const attachment of newAttachments) {
        if (attachment.type === 'file' && attachment.file) {
          await submitFile(data.submissionId, attachment.file);
        } else if (attachment.type === 'link' && attachment.url) {
          await submitLink(data.submissionId, attachment.url);
        }
      }

      await finalizeSubmission(data.submissionId);

      setIsSubmitted(true);
      updateAssignment(data.assignmentId, {
        ...data,
        IsSubmitted: true,
        submittedAt: new Date().toISOString(),
      });
      alert('과제 제출 완료');
      setIsModalOpen(false);
    } catch (err) {
      console.error('과제 제출 실패:', err);
      alert('과제 제출에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSubmission = async () => {
    setIsSubmitting(true);
    try {
      await cancelSubmission(data.submissionId);
      setIsSubmitted(false);
      updateAssignment(data.assignmentId, { ...data, IsSubmitted: false });
      alert('제출 취소 완료');
      setIsModalOpen(false);
    } catch (e) {
      alert('제출 취소 실패');
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAttachment = async (id: string, isNew: boolean) => {
    if (confirm('정말로 첨부파일을 삭제하시겠습니까?')) {
      try {
        if (!isNew) {
          // If it's an existing attachment, call the API
          await deleteSubmissionAttachment(id);
        }
        // Update the state to remove the file from the UI
        setAttachments((prev) => prev.filter((att) => att.id !== id));
        alert('첨부파일이 삭제되었습니다.');
      } catch (error) {
        console.error('첨부파일 삭제 실패:', error);
        alert('첨부파일 삭제에 실패했습니다.');
      }
    }
  };

  const renderDeadlineOrSubmission = () => {
    if (isSubmitted) {
      return (
        <s.InfoItem>
          <LuClock4 /> 제출 시간: {data.submittedAt ?? '없음'}
        </s.InfoItem>
      );
    }
    if (!data.endDate) {
      return (
        <s.InfoItem>
          <LuClock4 /> 마감일 정보 없음
        </s.InfoItem>
      );
    }
    const daysLeft = differenceInDays(parseISO(data.endDate), new Date());
    return (
      <s.InfoItem>
        <LuClock4 /> 마감까지 남은 일수: {daysLeft > 0 ? daysLeft : 0}일
      </s.InfoItem>
    );
  };

  const openModal = async () => {
    setIsModalOpen(true);
    setIsFetchingTeacherAttachments(true);
    try {
      let assignmentIdToUse = data.assignmentId;
      // If assignmentId looks like a submissionId (same id used), attempt to resolve real assignmentId
      if (!assignmentIdToUse || assignmentIdToUse === data.submissionId) {
        try {
          const submissionDetail = await getStudentSubmissionDetail(data.submissionId);
          if (submissionDetail && submissionDetail.assignmentId) {
            assignmentIdToUse = submissionDetail.assignmentId;
          }
        } catch (err) {
          console.warn('Failed to resolve assignmentId from submission detail, falling back to provided id', err);
        }
      }
      const attachments = await getAssignmentAttachments(assignmentIdToUse);
      if (Array.isArray(attachments)) {
        setTeacherAttachments(attachments);
      }
    } catch (error) {
      console.error('Failed to fetch teacher attachments:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsFetchingTeacherAttachments(false);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  const openUploadModal = () => {
    if (isSubmitted) return;
    fileInputRef.current?.click();
  };

  const openLinkModal = () => {
    if (isSubmitted) return;
    setIsLinkModalOpen(true);
  };

  return (
    <>
      <s.CardContainer onClick={openModal}>
        <s.CardHeader>
          <s.Title>{data.title}</s.Title>
          <s.StatusBadge variant={isSubmitted ? 'completed' : 'pending'}>
            {isSubmitted ? '제출됨' : '미제출'}
          </s.StatusBadge>
        </s.CardHeader>

        <s.InfoSection>
          <s.InfoItem>
            <IoCalendarClearOutline /> 마감일: {data.endDate}
          </s.InfoItem>
          {renderDeadlineOrSubmission()}
        </s.InfoSection>

        <s.FileListSection>
          {attachments
            .filter((att) => !att.isNew)
            .map((file) => (
              <s.FileItem key={file.id}>
                <s.FileInfoContainer>
                  {file.type === 'file' ? <FaRegFile /> : <FaLink />}
                  <s.FileNameText title={file.name}>{file.name}</s.FileNameText>
                </s.FileInfoContainer>

                {!isSubmitted && (
                  <s.FileRemoveButton onClick={() => handleDeleteAttachment(file.id, file.isNew || false)}>
                    <FaXmark />
                  </s.FileRemoveButton>
                )}
              </s.FileItem>
            ))}
        </s.FileListSection>
      </s.CardContainer>

      {isModalOpen && (
        <Modal
          title={data.title}
          onClose={closeModal}
          buttons={
            isSubmitted
              ? [
                { text: '닫기', type: 2, onClick: closeModal, width: "50%"},
                {
                  text: '제출 취소하기',
                  type: 1,
                  onClick: handleCancelSubmission,
                  disabled: isSubmitting,
                  width: "50%"
                },
              ]
              : [
                { text: '닫기', type: 0, onClick: closeModal },
                {
                  text: '과제 제출하기',
                  type: 1,
                  onClick: handleSubmit,
                  disabled: isSubmitting,
                },
              ]
          }
        >
          <div style={{ lineHeight: 1.6 }}>
            <p>
              <strong>설명:</strong> {data.content}
            </p>
            <p>
              <strong>마감일:</strong> {data.endDate}
            </p>
          </div>

          <div>
            <h4 style={{ margin: '0px', fontWeight: '600' }}>
              제공된 자료
            </h4>
            {isFetchingTeacherAttachments ? (
              <p>자료를 불러오는 중...</p>
            ) : teacherAttachments.length > 0 ? (
              <s.FileListSection>
                {teacherAttachments.map((att: TeacherAttachment, index) => (
                  <s.FileItem 
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={async () => {
                      if (att.type === 'FILE') {
                        try {
                          console.log('다운로드 시작:', att.assignmentAttachmentId);
                          
                          // Customapi를 사용하여 파일 다운로드
                          const response = await Customapi.get(
                            `/api/assignments/${att.assignmentAttachmentId}/download`,
                            {
                              responseType: 'blob', // 중요: blob 타입으로 응답 받기
                            }
                          );
                          
                          console.log('다운로드 성공:', response.status, response.headers);
                          
                          // 파일명 추출
                          const contentDisposition = response.headers['content-disposition'];
                          let filename = att.originalFileName || 'download';
                          
                          if (contentDisposition) {
                            const match = contentDisposition.match(/filename\*=UTF-8''(.+)|filename="?([^";]+)"?/);
                            if (match) {
                              filename = decodeURIComponent(match[1] || match[2]);
                            }
                          }
                          
                          // Blob을 URL로 변환하여 다운로드
                          const blob = new Blob([response.data]);
                          const url = window.URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = filename;
                          document.body.appendChild(link);
                          link.click();
                          link.remove();
                          window.URL.revokeObjectURL(url);
                          
                          console.log('파일 다운로드 완료:', filename);
                        } catch (error) {
                          const axiosError = error as AxiosError;
                          console.error('파일 다운로드 실패:', {
                            message: error instanceof Error ? error.message : '알 수 없는 오류',
                            status: axiosError.response?.status,
                            statusText: axiosError.response?.statusText,
                            data: axiosError.response?.data,
                          });
                          const errorMessage = axiosError.response?.status 
                            ? `${axiosError.response.status}` 
                            : error instanceof Error ? error.message : '알 수 없는 오류';
                          alert(`파일을 다운로드할 수 없습니다.\n오류: ${errorMessage}`);
                        }
                      } else {
                        // LINK type - 새 창에서 열기
                        if (att.value) {
                          window.open(att.value, '_blank');
                        }
                      }
                    }}
                  >
                    <s.FileInfoContainer>
                      {att.type === 'FILE' ? <FaRegFile /> : <FaLink />}
                      <div>
                        <s.FileNameText>
                          {att.type === 'FILE' ? att.originalFileName : att.value}
                        </s.FileNameText>
                      </div>
                    </s.FileInfoContainer>
                  </s.FileItem>
                ))}
              </s.FileListSection>
            ) : (
              <p>제공된 자료가 없습니다.</p>
            )}
          </div>

          <AttachmentBox
            attachments={attachments}
            setAttachments={setAttachments}
            openUploadModal={openUploadModal}
            openLinkModal={openLinkModal}
            isSubmitted={isSubmitted}
            onDeleteAttachment={handleDeleteAttachment}
          />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            disabled={isSubmitted}
          />
        </Modal>
      )}

      {isLinkModalOpen && (
        <AddModal
          title="링크 추가"
          onClose={() => setIsLinkModalOpen(false)}
          onAdd={handleAddLink}
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="https://..."
        />
      )}
    </>
  );
}