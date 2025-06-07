import React, { useState } from 'react';
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { FaRegFile, FaXmark } from "react-icons/fa6";
import { MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { AssignmentData } from '@/shared/theme/AssignmentTheme';
import styles from '@/shared/css/Class/Assignment/Assignment.module.css';

interface AssignmentCardProps {
  data: AssignmentData;
}

interface FileInfo {
  id: string;
  name: string;
  size: string;
}

export function AssignmentCard({ data }: AssignmentCardProps) {
  const initialFiles: FileInfo[] = data.hasFile
    ? [{ id: crypto.randomUUID(), name: data.fileName!, size: data.fileSize! }]
    : [];

  const [submitted, setSubmitted] = useState(data.buttonType === "resubmit");
  const [files, setFiles] = useState<FileInfo[]>(initialFiles);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("파일을 먼저 업로드 해주세요.");
      return;
    }

    const url = `/class/${data.classId}/${data.lessonId}/upload/`;
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

    const uploadedFiles: FileInfo[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const f = selectedFiles[i];
      const formData = new FormData();
      formData.append("file", f);

      try {
        await fetch(`/class/${data.classId}/${data.lessonId}/upload`, {
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

  const statusClass = data.status === "제출됨" ? styles.statusSubmitted : styles.statusNotSubmitted;

  const onFileInfoClick = (file: FileInfo) => {
    if (!submitted) {
      alert(`파일명: ${file.name}\n파일 크기: ${file.size}`);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{data.title}</h3>
        <span className={`${styles.status} ${statusClass}`}>
          {data.status}
        </span>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoItem}>
          <IoCalendarClearOutline className={styles.icon} /> 
          마감일: {data.deadline}
        </div>
        <div className={styles.infoItem}>
          <LuClock4 className={styles.icon} />
          <span className={data.timeLeftColor}>{data.timeLeft}</span>
        </div>
      </div>

      {/* 파일 표시 영역 (제출 안 했으면 파일 목록과 업로드 버튼 모두 보임) */}
      {files.length > 0 && (
        <div className={styles.fileSection}>
          {files.map(file => (
            <div 
              key={file.id}
              className={styles.fileItem} 
              onClick={() => onFileInfoClick(file)} 
              style={{ cursor: submitted ? 'default' : 'pointer' }}
            >
              <div className={styles.fileInfo}>
                <FaRegFile className={styles.icon} />
                <div>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileSize}>{file.size}</div>
                </div>
              </div>
              {!submitted && (
                <FaXmark
                  className={`${styles.icon} ${styles.removeButton}`}
                  onClick={e => {
                    e.stopPropagation();
                    handleFileRemove(file.id);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 제출 안했으면 업로드 버튼도 계속 보여줌 */}
      {!submitted && (
        <button className={styles.uploadButton} onClick={openUploadModal}>
          <MdUpload className={styles.icon} /> 파일 업로드
        </button>
      )}

      {/* 제출 / 다시 제출하기 버튼 */}
      {submitted ? (
        <button
          className={`${styles.button} ${styles.resubmitButton}`}
          onClick={handleResubmitClick}
        >
          <MdOutlineFileDownload className={styles.icon} />
          다시 제출하기
        </button>
      ) : (
        <button
          className={`${styles.button} ${styles.submitButton}`}
          onClick={handleSubmit}
        >
          <MdOutlineFileDownload className={styles.icon} />
          과제 제출하기
        </button>
      )}

      {/* 파일 업로드 모달 */}
      {showUploadModal && (
        <div className={styles.modalOverlay} onClick={closeUploadModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <p className={styles.title}>파일 업로드</p>
            <input type="file" multiple onChange={handleFileUpload} style={{ marginTop: '1rem' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button className={`${styles.button} ${styles.resubmitButton}`} onClick={closeUploadModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
