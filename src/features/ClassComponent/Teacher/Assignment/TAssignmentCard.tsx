import React, { useState } from 'react';
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { FaRegFile, FaXmark } from "react-icons/fa6";
import { MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { AssignmentData } from '@/shared/theme/AssignmentTheme';
import { useParams } from 'react-router-dom';
import TCheckStudent from './TCheckStudent';

import {
  Card, Header, Title, StatusNotSubmitted, SubmitButton,
  InfoSection, InfoItem, Icon,
  FileInfo, FileItem, FileName, FileSection, FileSize,
  RemoveButton, ResubmitButton, UploadButton,
  ModalOverlay, ModalContent
} from '@/features/ClassComponent/Assignment/styles';

interface AssignmentCardProps {
  data: AssignmentData;
  onCheck?: () => void;
}

interface FileInfo {
  id: string;
  name: string;
  size: string;
}

export function TAssignmentCard({ data, onCheck }: AssignmentCardProps) {
  const { classId } = useParams<{ classId: string }>();
  const initialFiles: FileInfo[] = data.hasFile
    ? [{ id: crypto.randomUUID(), name: data.fileName!, size: data.fileSize! }]
    : [];

  const [submitted, setSubmitted] = useState(data.buttonType === "resubmit");
  const [files, setFiles] = useState<FileInfo[]>(initialFiles);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const handleSubmit = async () => {
    const url = `/class/${data.classId}/${data.homeworkId}/upload/`;
    try {
      await fetch(url);
      setSubmitted(true);
      alert("등록이 완료되었습니다.");
      setShowUploadModal(false);
    } catch (error) {
      alert("등록에 실패했습니다.");
      console.error(error);
    }
  };

  const handleFileRemove = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const uploadedFiles: FileInfo[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const f = selectedFiles[i];
      const formData = new FormData();
      formData.append("file", f);

      try {
        await fetch(`/class/${data.classId}/${data.homeworkId}/upload`, {
          method: 'POST',
          body: formData,
        });
        uploadedFiles.push({
          id: crypto.randomUUID(),
          name: f.name,
          size: `${(f.size / 1024).toFixed(1)} KB`,
        });
      } catch (error) {
        alert(`${f.name} 파일 업로드 실패`);
        console.error(error);
      }
    }

    if (uploadedFiles.length > 0) {
      setFiles(prev => [...prev, ...uploadedFiles]);
      alert("파일이 업로드 되었습니다.");
      setShowUploadModal(false);
    }
  };

  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);
  const handleResubmitClick = () => setSubmitted(false);

  const onFileInfoClick = (file: FileInfo) => {
    if (!submitted) {
      alert(`파일명: ${file.name}\n파일 크기: ${file.size}`);
    }
  };

  const maxpeople = 16;

  return (
    <Card>
      <Header>
        <Title>{data.title}</Title>
        {data.people === maxpeople && (
          <StatusNotSubmitted>전원제출</StatusNotSubmitted>
        )}
      </Header>

      <InfoSection>
        <InfoItem>
          <Icon><IoCalendarClearOutline /></Icon> 마감일: {data.deadline}
        </InfoItem>
        <InfoItem>
          <Icon><LuClock4 /></Icon>
          <span style={{ color: data.timeLeftColor === 'red' ? '#fa5252' : '#20c997' }}>
            {data.timeLeft}
          </span>
        </InfoItem>
      </InfoSection>

      {files.length > 0 && (
        <FileSection>
          {files.map(file => (
            <FileItem
              key={file.id}
              onClick={() => onFileInfoClick(file)}
              style={{ cursor: submitted ? 'default' : 'pointer' }}
            >
              <FileInfo>
                <Icon><FaRegFile /></Icon>
                <div>
                  <FileName>{file.name}</FileName>
                  <FileSize>{file.size}</FileSize>
                </div>
              </FileInfo>
              {!submitted && (
                <RemoveButton
                  onClick={e => {
                    e.stopPropagation();
                    handleFileRemove(file.id);
                  }}
                />
              )}
            </FileItem>
          ))}
        </FileSection>
      )}

      {!submitted && (
        <UploadButton onClick={openUploadModal}>
          <MdUpload /> 파일 업로드
        </UploadButton>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        {submitted ? (
          <ResubmitButton onClick={handleResubmitClick}>
            <MdOutlineFileDownload /> 내용수정
          </ResubmitButton>
        ) : (
          <SubmitButton onClick={handleSubmit}>
            <MdOutlineFileDownload /> 업로드
          </SubmitButton>
        )}
        <SubmitButton onClick={onCheck}>채점하기</SubmitButton>
      </div>

      {showCheck && (
        <div style={{ marginTop: 24, background: '#f8f9fa', borderRadius: 8, padding: 16 }}>
          <TCheckStudent classId={classId} lessonId={data.id} />
        </div>
      )}

      {showUploadModal && (
        <ModalOverlay onClick={closeUploadModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <Title>파일 업로드</Title>
            <input type="file" multiple onChange={handleFileUpload} style={{ marginTop: '1rem' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <ResubmitButton onClick={closeUploadModal}>취소</ResubmitButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Card>
  );
}