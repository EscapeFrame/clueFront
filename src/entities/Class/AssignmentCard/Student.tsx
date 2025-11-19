import React, { useState, useRef, useEffect } from 'react';
import * as s from './styles';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import { FaRegFile, FaLink } from 'react-icons/fa6';
import { differenceInDays, parseISO } from 'date-fns';
import { Modal } from '@/entities/UI/Modal';
import {
  submitFile,
  submitLink,
  finalizeSubmission,
  cancelSubmission,
  getAssignmentAttachments,
} from '../api';
import AttachmentBox from '@/entities/UI/Attachment';
import AddModal from '@/entities/UI/AddModal';

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

  const [teacherAttachments, setTeacherAttachments] = useState<
    TeacherAttachment[]
  >([]);
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
      const attachments = await getAssignmentAttachments(data.assignmentId);
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
                  <FaRegFile />
                  <div>
                    <s.FileNameText>{file.name}</s.FileNameText>
                  </div>
                </s.FileInfoContainer>
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
                  { text: '닫기', type: 0, onClick: closeModal },
                  {
                    text: '제출 취소하기',
                    type: 1,
                    onClick: handleCancelSubmission,
                    disabled: isSubmitting,
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
          <div style={{ lineHeight: 1.6, marginBottom: '20px' }}>
            <p>
              <strong>설명:</strong> {data.content}
            </p>
            <p>
              <strong>마감일:</strong> {data.endDate}
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px', fontWeight: 'bold' }}>
              제공된 자료
            </h4>
            {isFetchingTeacherAttachments ? (
              <p>자료를 불러오는 중...</p>
            ) : teacherAttachments.length > 0 ? (
              <s.FileListSection>
                {teacherAttachments.map((att, index) => (
                  <a
                    key={index}
                    href={att.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <s.FileItem>
                      <s.FileInfoContainer>
                        {att.type === 'FILE' ? <FaRegFile /> : <FaLink />}
                        <div>
                          <s.FileNameText>
                            {att.type === 'FILE'
                              ? att.originalFileName
                              : att.value}
                          </s.FileNameText>
                        </div>
                      </s.FileInfoContainer>
                    </s.FileItem>
                  </a>
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