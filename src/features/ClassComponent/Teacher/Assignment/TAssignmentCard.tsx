import React, { useState } from 'react';
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { FaRegFile } from "react-icons/fa6";
import { MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { useParams } from 'react-router-dom';
import TCheckStudent from './TCheckStudent';
import { AssignmentType } from '@/shared/types/Assignment';

import {
  Card, Header, Title, StatusNotSubmitted, SubmitButton,
  InfoSection, InfoItem, Icon,
  FileInfo, FileItem, FileName, FileSection, FileSize,
  RemoveButton, ResubmitButton, UploadButton,
  ModalOverlay, ModalContent
} from '@/features/ClassComponent/Assignment/styles';

// cardThemeDummy의 객체 타입 정의
export type CardThemeType = AssignmentType ;

interface AssignmentCardProps {
  data: CardThemeType;
  onCheck?: () => void;
}

interface FileInfo {
  id: string;
  name: string;
  size: string;
}

export function TAssignmentCard({ data, onCheck }: AssignmentCardProps) {
  const { classId } = useParams<{ classId: string }>();
  const initialFiles: FileInfo[] = data.files && data.files.length > 0
    ? data.files.map(f => ({
        id: String(f.fileId),
        name: f.fileName,
        size: `${f.fileSize} MB`
      }))
    : [];

  // buttonType, hasFile 등은 내부 상태로 관리
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<FileInfo[]>(initialFiles);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const handleSubmit = async () => {
    // classId, homeworkId가 없으므로 임시 URL 사용
    const fileId = data.files[0]?.fileId;
    const url = `/class/${classId}/${fileId}/upload/`;
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
    const fileId = data.files[0]?.fileId;
    for (let i = 0; i < selectedFiles.length; i++) {
      const f = selectedFiles[i];
      const formData = new FormData();
      formData.append("file", f);

      try {
        await fetch(`/class/${classId}/${fileId}/upload`, {
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
  const people = undefined;

  return (
    <Card>
      <Header>
        <Title>{data.title}</Title>
        {people === maxpeople && (
          <StatusNotSubmitted>전원제출</StatusNotSubmitted>
        )}
      </Header>

      <InfoSection>
        <InfoItem>
          <Icon><IoCalendarClearOutline /></Icon> 마감일: {data.endDate}
        </InfoItem>
        <InfoItem>
          <Icon><LuClock4 /></Icon>
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
          {/* fileId를 lessonId로 넘김 */}
          <TCheckStudent classId={classId} lessonId={data.files[0]?.fileId} />
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