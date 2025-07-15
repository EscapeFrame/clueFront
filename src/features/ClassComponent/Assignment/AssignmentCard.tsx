import React, { useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { FaRegFile, FaXmark } from "react-icons/fa6";
import { MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { AssignmentData } from "@/shared/theme/AssignmentTheme";
import * as S from "./styles";
import SlidePanel from "./SlidePanel/SlidePanel";

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
  const [showSlidePanel, setShowSlidePanel] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    setShowSlidePanel(true);
  };

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
    setFiles(files.filter((file) => file.id !== id));
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
          method: "POST",
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
      setFiles((prev) => [...prev, ...uploadedFiles]);
      alert("파일이 업로드 되었습니다.");
      setShowUploadModal(false);
    }
  };

  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  const handleResubmitClick = () => {
    setSubmitted(false);
  };

  const statusClass =
    data.status === "제출됨" ? (
      <S.StatusSubmitted>{data.status}</S.StatusSubmitted>
    ) : (
      <S.StatusNotSubmitted>{data.status}</S.StatusNotSubmitted>
    );

  const onFileInfoClick = (file: FileInfoType) => {
    if (!submitted) {
      alert(`파일명: ${file.name}\n파일 크기: ${file.size}`);
    }
  };

  return (
    <>
      <S.ClickableCard onClick={handleCardClick}>
        <S.Header>
          <S.Title>{data.title}</S.Title>
          {statusClass}
        </S.Header>

        <S.InfoSection>
          <S.InfoItem>
            <IoCalendarClearOutline />
            마감일: {data.deadline}
          </S.InfoItem>
          <S.InfoItem>
            <LuClock4 />
            <span className={data.timeLeftColor}>{data.timeLeft}</span>
          </S.InfoItem>
        </S.InfoSection>

        {files.length > 0 && (
          <S.FileSection>
            {files.map((file) => (
              <S.FileItem
                key={file.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onFileInfoClick(file);
                }}
                style={{ cursor: submitted ? "default" : "pointer" }}
              >
                <S.FileInfo>
                  <FaRegFile />
                  <div>
                    <S.FileName>{file.name}</S.FileName>
                    <S.FileSize>{file.size}</S.FileSize>
                  </div>
                </S.FileInfo>
                {!submitted && (
                  <S.RemoveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileRemove(file.id);
                    }}
                  >
                    <FaXmark />
                  </S.RemoveButton>
                )}
              </S.FileItem>
            ))}
          </S.FileSection>
        )}

        {!submitted && (
          <S.UploadButton
            onClick={(e) => {
              e.stopPropagation();
              openUploadModal();
            }}
          >
            <MdUpload />
            파일 업로드
          </S.UploadButton>
        )}

        {submitted ? (
          <S.ResubmitButton
            onClick={(e) => {
              e.stopPropagation();
              handleResubmitClick();
            }}
          >
            <MdOutlineFileDownload />
            다시 제출하기
          </S.ResubmitButton>
        ) : (
          <S.SubmitButton
            onClick={(e) => {
              e.stopPropagation();
              handleSubmit();
            }}
          >
            <MdOutlineFileDownload />
            과제 제출하기
          </S.SubmitButton>
        )}

        {showUploadModal && (
          <S.ModalOverlay onClick={closeUploadModal}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
              <S.Title>파일 업로드</S.Title>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ marginTop: "1rem" }}
              />
              <S.DisplayFlex
                style={{ justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}
              >
                <S.ResubmitButton onClick={closeUploadModal}>취소</S.ResubmitButton>
              </S.DisplayFlex>
            </S.ModalContent>
          </S.ModalOverlay>
        )}
      </S.ClickableCard>

      {/* 슬라이드 패널 */}
      <SlidePanel
        isOpen={showSlidePanel}
        onClose={() => setShowSlidePanel(false)}
        title={data.title}
        status={data.status}
        deadline={data.deadline}
        timeLeft={data.timeLeft}
        description={data.description}
        teacherFiles={
          data.hasFile
            ? [{ id: crypto.randomUUID(), name: data.fileName!, size: data.fileSize! }]
            : []
        }
        studentFiles={files}
        submitted={submitted}
        onSubmit={handleSubmit}
        onResubmit={handleResubmitClick}
        onFileRemove={handleFileRemove}
        onFileUpload={handleFileUpload}
        isTeacher={false}
      />
    </>
  );
}