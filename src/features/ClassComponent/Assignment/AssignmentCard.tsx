import React, { useState } from 'react';
import Customapi from '@/shared/api/axios';
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { FaRegFile, FaXmark } from "react-icons/fa6";
import { MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { AssignmentType } from '@/shared/types/Assignment';
import {
  Card, Header, Title,
  StatusSubmitted, StatusNotSubmitted,
  InfoSection, InfoItem, FileSection, FileItem,
  FileInfo, FileName, FileSize, RemoveButton,
  UploadButton, SubmitButton, ResubmitButton,
  ModalOverlay, ModalContent, DisplayFlex
} from '@/features/ClassComponent/Assignment/styles';

interface AssignmentCardProps {
  data: AssignmentType;
}

interface FileInfoType {
  id: string;
  name: string;
  size: string;
}

export function AssignmentCard({ data }: AssignmentCardProps) {
  // files 배열에서 초기 파일 정보 생성
  const initialFiles: FileInfoType[] = data.files?.map(f => ({
    id: String(f.fileId),
    name: f.fileName,
    size: `${f.fileSize} MB`
  })) ?? [];
  const assignmentId = data.assignmentId;

  // buttonType, hasFile 등은 내부 상태로 관리
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<FileInfoType[]>(initialFiles);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("파일을 먼저 업로드 해주세요.");
      return;
    }
    const assignmentId = data.assignmentId;
    const url = `/api/assignments/submit/${assignmentId}`;
    // 첫 번째 파일만 전송 (여러 파일 지원 필요시 반복문 사용)
    const formData = new FormData();
    formData.append("file", files[0] && files[0].name ? files[0].name : "");
    try {
      await Customapi.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
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
        await Customapi.post(`/api/assignments/submit/${assignmentId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
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
    Customapi.delete(`/api/assignments/submit/${assignmentId}`)
    .then(res => { console.log("제출취소") })
    .catch(err => console.error(err));
  };
  const statusClass = submitted ? <StatusSubmitted>제출됨</StatusSubmitted> : <StatusNotSubmitted>미제출</StatusNotSubmitted>;
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
          마감일: {data.endDate}
        </InfoItem>
        <InfoItem>
          <LuClock4 />
          <span style={{ color: '#578FCA' }}>
            {data.duringDate}
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