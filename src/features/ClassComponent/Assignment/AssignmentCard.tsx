import React, { useState } from 'react';
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { FaRegFile, FaXmark } from "react-icons/fa6";
import { MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { AssignmentData } from '@/shared/theme/AssignmentTheme';
import {
  Card, Header, Title,
  StatusSubmitted, StatusNotSubmitted,
  InfoSection, InfoItem, FileSection, FileItem, 
  FileInfo, FileName, FileSize, RemoveButton,
  UploadButton, SubmitButton, ResubmitButton,
  ModalOverlay, ModalContent, DisplayFlex
} from '@/features/ClassComponent/Assignment/styles';

interface AssignmentCardProps {
  data: AssignmentData;
}

interface FileInfoType {
  id: string;
  name: string;
  size: string;
}

export function AssignmentCard({ data }: AssignmentCardProps) {
  const initialFiles: FileInfoType[] = data.hasFile
    ? [{ id: crypto.randomUUID(), name: data.fileName!, size: data.fileSize! }]
    : [];

  const [submitted, setSubmitted] = useState(data.buttonType === "resubmit");
  const [files, setFiles] = useState<FileInfoType[]>(initialFiles);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("파일을 먼저 업로드 해주세요.");
      return;
    }

    const url = `/class/${data.classId}/${data.homeworkId}/upload/`;
    try {
      await fetch(url);
      setSubmitted(true);
      alert("과제가 제출되었습니다.");
      setShowUploadModal(false);
    } catch (error) {
      alert("제출에 실패했습니다.");
      console.error(error);
    }
  };

  const handleFileRemove = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const uploadedFiles: FileInfoType[] = [];
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

  const handleResubmitClick = () => {
    setSubmitted(false);
  };

  const statusClass = data.status === "제출됨" ? <StatusSubmitted>{data.status}</StatusSubmitted> : <StatusNotSubmitted>{data.status}</StatusNotSubmitted>;

  const onFileInfoClick = (file: FileInfoType) => {
    if (!submitted) {
      alert(`파일명: ${file.name}\n파일 크기: ${file.size}`);
    }
  };

  return (
    <Card>
      <Header>
        <Title>{data.title}</Title>
        {statusClass}
      </Header>

      <InfoSection>
        <InfoItem>
          <IoCalendarClearOutline />
          마감일: {data.deadline}
        </InfoItem>
        <InfoItem>
          <LuClock4 />
          <span className={data.timeLeftColor}>{data.timeLeft}</span>
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
                <FaRegFile />
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
                >
                  <FaXmark />
                </RemoveButton>
              )}
            </FileItem>
          ))}
        </FileSection>
      )}

      {!submitted && (
        <UploadButton onClick={openUploadModal}>
          <MdUpload />
          파일 업로드
        </UploadButton>
      )}

      {submitted ? (
        <ResubmitButton onClick={handleResubmitClick}>
          <MdOutlineFileDownload />
          다시 제출하기
        </ResubmitButton>
      ) : (
        <SubmitButton onClick={handleSubmit}>
          <MdOutlineFileDownload />
          과제 제출하기
        </SubmitButton>
      )}

      {showUploadModal && (
        <ModalOverlay onClick={closeUploadModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <Title>파일 업로드</Title>
            <input type="file" multiple onChange={handleFileUpload} style={{ marginTop: '1rem' }} />
            <DisplayFlex style={{ justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <ResubmitButton onClick={closeUploadModal}>
                취소
              </ResubmitButton>
            </DisplayFlex>
          </ModalContent>
        </ModalOverlay>
      )}
    </Card>
  );
}